var plot_bgcolor = "#3c3c3c";
var plot_font_color = "ffffff";

const graphic1 = {
    data: [
        trace0 = {
            x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            y: [0, 0, 0, 2, 9, 53, 29, 190, 322, 691, 1098],
            mode: "lines",
            type: "scatter"
        }
    ],
    layout: {
        xaxis: {
            range: [0, 11],
            title: "Weeks after launch",
            linecolor:plot_font_color,
            gridcolor:plot_font_color
        },
        yaxis: {
            range: [0, 1500],
            title: "Views",
            linecolor:plot_font_color,
            gridcolor:plot_font_color
        },
        title: "My little cats",
        font:{
            color:plot_font_color
        },
        plot_bgcolor: plot_bgcolor,
        paper_bgcolor: plot_bgcolor,
        coloraxis:{
            colorbar:{
                bgcolor:plot_font_color
            }
        }
    }
}
const graphic2 = {
    data: [
        trace0 = {
            x: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
            y: [14, 20, 42, 52, 69, 78, 92, 190, 322, 691, 1098, 2456, 3545, 6923, 6520, 13290, 14259, 14793, 15103],
            mode: "lines",
            type: "scatter"
        }
    ],
    layout: {
        xaxis: {
            range: [0, 25],
            title: "Weeks after launch",
            linecolor:plot_font_color,
            gridcolor:plot_font_color
        },
        yaxis: {
            range: [0, 15000],
            title: "Weeks after launch",
            linecolor:plot_font_color,
            gridcolor:plot_font_color
        },
        title: "My little dogs",
        font:{
            color:plot_font_color
        },
        plot_bgcolor: plot_bgcolor,
        paper_bgcolor: plot_bgcolor,
        coloraxis:{
            colorbar:{
                bgcolor:plot_font_color
            }
        }
    }
}

Plotly.newPlot("plotChart1", graphic1.data, graphic1.layout);
Plotly.newPlot("plotChart2", graphic2.data, graphic2.layout, { responsive: true });
