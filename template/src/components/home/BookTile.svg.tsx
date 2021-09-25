//#region Imports
import styled from '@emotion/styled';
import React from 'react';
//#endregion

type IAvailableColorForBook = 'blue' | 'red' | 'green';

interface IColorInfo {
    light: string;
    dark: string;
    text: string;
}

let colors: { [key in IAvailableColorForBook]: IColorInfo } = {
    green: {
        light: 'rgb(177 249 201)',
        dark: 'rgb(114 212 146)',
        text: '#000',
    },
    blue: {
        light: 'rgb(216, 216, 255)',
        dark: 'rgb(155, 156, 255)',
        text: '#000',
    },
    red: {
        light: 'rgb(249 208 219)',
        dark: 'rgb(243 163 184)',
        text: '#000',
    },
};

export const AllBookColors = Object.keys(colors) as IAvailableColorForBook[];

interface IProps {
    title: string;
    color: IAvailableColorForBook;
}

// This SVG was designed in Inkscape.  To import it into react, you
// need to make some updates:
//   * Convert style tags from strings to objects
//   * Comment out xmlns:svg attributes
// I also made parameterization updates.
export const BookSVG: React.FunctionComponent<IProps> = (props) => {
    let colorInfo = colors[props.color];

    return (
        <svg
            width="200"
            height="230"
            viewBox="0 0 52.916666 60.854168"
            version="1.1"
            id="svg5"
            xmlns="http://www.w3.org/2000/svg"
            //xmlns:svg="http://www.w3.org/2000/svg"
        >
            <defs id="defs2" />
            <g id="layer1">
                <rect
                    style={{
                        fill: '#d0d0d0',
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.278489,
                    }}
                    id="rect3114"
                    width="40.125725"
                    height="48.131344"
                    x="5.3931379"
                    y="6.134769"
                    ry="4.8302927"
                />
                <rect
                    style={{
                        fill: '#ffffff',
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.278489,
                    }}
                    id="rect2940"
                    width="40.125725"
                    height="48.131344"
                    x="5.4331002"
                    y="4.1766148"
                    ry="4.8302927"
                />
                <rect
                    style={{
                        fill: colorInfo.light,
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.278489,
                    }}
                    id="rect851"
                    width="40.125725"
                    height="48.131344"
                    x="5.4331002"
                    y="2.0186493"
                    ry="4.8302927"
                />
                <path
                    id="rect3980"
                    style={{
                        fill: colorInfo.dark,
                        fillOpacity: 1,
                        stroke: 'none',
                        strokeWidth: 0.278489,
                    }}
                    d="M 62.050781 7.6894531 L 39.003906 7.84375 C 28.889959 7.84375 20.748047 15.985661 20.748047 26.099609 L 20.748047 157.75586 L 20.541016 157.75977 L 20.535156 193.93945 C 20.443936 193.19687 20.382813 192.44576 20.382812 191.67773 L 20.382812 199.83398 C 20.382812 209.94793 28.526677 218.08984 38.640625 218.08984 L 153.7832 218.08984 C 163.89715 218.08984 172.03906 209.94793 172.03906 199.83398 L 172.03906 191.67773 C 172.03906 201.79168 163.89715 209.93359 153.7832 209.93359 L 44.535156 209.93359 L 44.535156 209.88086 A 9.4914891 10.071559 0 0 1 35.089844 199.81055 A 9.4914891 10.071559 0 0 1 44.40625 189.74609 L 44.40625 189.73828 L 62.050781 189.67773 L 62.050781 7.6894531 z "
                    transform="scale(0.26458333)"
                />
                <text
                    //xml:space="preserve"
                    style={{
                        //fontSize: '6.18692px',
                        fontSize: '4px',
                        lineHeight: 1.25,
                        fontFamily: 'sans-serif',
                        textAlign: 'center',
                        textAnchor: 'middle',
                        strokeWidth: 0.154673,
                    }}
                    x="29.559258"
                    y="13.700226"
                    id="text16466"
                >
                    {props.title.split(' ').map((word, i) => {
                        return (
                            <tspan
                                key={i}
                                id="tspan16464"
                                style={{ strokeWidth: 0.154673 }}
                                x="29.559258"
                                y={13.700226 + 7.733648 * i}
                            >
                                {word}
                            </tspan>
                        );
                    })}
                    {/* <tspan
                        id="tspan16464"
                        style={{ strokeWidth: 0.154673 }}
                        x="29.559258"
                        y="13.700226"
                    >
                        Getting
                    </tspan>
                    <tspan
                        style={{ strokeWidth: 0.154673 }}
                        x="29.559258"
                        y="21.433874"
                        id="tspan16468"
                    >
                        Started
                    </tspan> */}
                </text>
            </g>
            <g id="layer3" style={{ opacity: 0.42951907 }} />
            <g id="layer2" />
        </svg>
    );
};
