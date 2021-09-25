import React, { useState } from 'react';
import config from '../../../config';
import { TreeNode } from './TreeNode';
import { partition } from './tree.helpers';
import { INode } from './Tree.common';

export interface IRawEdge {
    node: {
        fields: {
            slug: string;
            title: string;
        };
        frontmatter: {
            navOrder: number;
            collapsedByDefault: boolean;
        };
    };
}

interface IAccumulatedNodeTree {
    nodes: INode[];
}


// a is after b => +1
// b is after a => -1
// equal        => 0
const sortNodes: (a: INode, b: INode) => number = (a, b) => {
    // Ensure explicit values of sort order come first
    if (a.sortOrder !== null && b.sortOrder === null) {
        return -1;
    }

    if (b.sortOrder !== null && a.sortOrder === null) {
        return 1;
    }

    if (a.sortOrder !== null && b.sortOrder !== null) {
        return a.sortOrder - b.sortOrder;
    }

    // Sort nodes without explicit sort orders alphabetically
    return String.prototype.localeCompare.call(a.label, b.label);
}

const populateChildNodesFromQueue = (
    nodesToPopulateWithChildren: INode[],
    queueToPopulateFrom: INode[]
) => {
    for (let nodeToPopulate of nodesToPopulateWithChildren) {
        // TODO: it'd be more effiecient to update the queue to not include the identified children, but we can do that later...
        //let [children, nonChildren] = partition(queueToPopulateFrom, node => node.parentSlug == nodeToPopulate.urlSlug);
        let children = queueToPopulateFrom.filter(
            (node) => node.parentSlug == nodeToPopulate.urlSlug
        );

        if (children.length != 0) {
            populateChildNodesFromQueue(children, queueToPopulateFrom);

            children.sort(sortNodes);

            nodeToPopulate.children = children;
        }
    }
};

const calculateTreeData = (originalData: IRawEdge[]) => {
    let edges = [...originalData];

    console.log('edges', edges);

    // Don't include the landing page if we're configured not to.
    if (config.sidebar.ignoreIndex) {
        edges = edges.filter((edge) => edge.node.fields.slug !== '/');
    }

    // First thing first, reshape the data into a more useful form.
    let mappedEdges: INode[] = edges.map((edge) => {
        let { slug, title } = edge.node.fields;

        // Split the URL Slug of the page (e.g. '/getting_started/prereqs' => ['getting_started', 'prereqs'])
        let urlSlugParts = slug
            .split('/')
            // Slugs start with '/', so the split will leave a blank item at the start of the array that we
            // remove with an air-bending slice
            .slice(1);

        // If we also have trailing slashes, remove that as well
        if (config.gatsby.trailingSlash) {
            urlSlugParts = urlSlugParts.slice(0, -1);
        }

        // Get the parent slug (e.g. '/getting_started/prereqs' => '/getting_started')
        const parentSlugParts = urlSlugParts.slice(0, -1);
        const parentSlug: string | null =
            parentSlugParts.length > 0 ? `/${parentSlugParts.join('/')}` : null;

        let result: INode = {
            label: urlSlugParts[urlSlugParts.length - 1],
            id: urlSlugParts[urlSlugParts.length - 1], // todo: update this with the real id
            urlSlug: `/${urlSlugParts.join('/')}`,
            parentSlug,
            title,
            sortOrder: edge.node.frontmatter.navOrder,
            defaultToCollapsed: edge.node.frontmatter.collapsedByDefault,
            documentName: (edge.node as any).parent.sourceInstanceName,
        };

        return result;
    });

    // Partition out the nodes.
    let [rootNodes, otherNodes] = partition(mappedEdges, (edge) => edge.parentSlug == null);

    // Populate the children
    populateChildNodesFromQueue(rootNodes, otherNodes);

    rootNodes.sort(sortNodes);

    const tree: IAccumulatedNodeTree = {
        nodes: rootNodes,
    };

    return tree;
};

const Tree = (data: { edges: IRawEdge[]; docName: string }) => {
    let [treeData] = useState(() => {
        return calculateTreeData(data.edges);
    });

    const defaultCollapsed = {};

    const markAsCollapsed = (nodes: INode[]) => {
        nodes.forEach((item) => {
            if (item.defaultToCollapsed) {
                defaultCollapsed[item.urlSlug] = true;

                item.children && markAsCollapsed(item.children);
            }
        });
    };

    markAsCollapsed(treeData.nodes);

    const [collapsed, setCollapsed] = useState(defaultCollapsed);

    const toggle = (url) => {
        setCollapsed({
            ...collapsed,
            [url]: !collapsed[url],
        });
    };

    let availableDocs = treeData.nodes
        .map((x) => x.documentName)
        .filter((x, i, array) => array.indexOf(x) == i);
    let [selectedDoc, updateSelectedDoc] = useState(data.docName || availableDocs[0]);

    React.useEffect(() => {
        updateSelectedDoc(data.docName);
    }, [data.docName]);

    console.log(treeData);

    return (
        <>
            {/* <select value={selectedDoc} onChange={(e) => updateSelectedDoc(e.target.value)}>
                {availableDocs.map((doc) => {
                    return (
                        <option key={doc} value={doc}>
                            {doc}
                        </option>
                    );
                })}
            </select> */}
            {treeData.nodes
                .filter((node) => node.documentName == selectedDoc)
                .map((node, i) => {
                    let url = node.urlSlug;
                    if (node.documentName) {
                        url = `/${node.documentName}${url}`;
                    }
                    return (
                        <TreeNode
                            key={i}
                            className={`hideFrontLine`}
                            setCollapsed={toggle}
                            collapsedMap={collapsed}
                            title={node.title}
                            items={node.children}
                            url={url}
                        />
                    );
                })}
        </>
    );
};

export default Tree;
