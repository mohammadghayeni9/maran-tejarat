<template>
    <div class="column-chart" ref="columnChart" dir="ltr"></div>
</template>

<script>
import * as am4core from "@amcharts/amcharts4/core"
import * as am4charts from "@amcharts/amcharts4/charts"
import am4themes_animated from "@amcharts/amcharts4/themes/animated"
am4core.useTheme(am4themes_animated);

export default {
    props: {
        data: {
            required: true
        }
    },
    mounted() {
        // static section
        am4core.addLicense("ch-custom-attribution")
        let chart = am4core.create(this.$refs.columnChart, am4charts.XYChart);
        chart.hiddenState.properties.opacity = 0; // this creates initial fade-in
        chart.data = this.data;
        chart.padding(10, 10, 0, 0);

        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.dataFields.category = "name";
        categoryAxis.renderer.minGridDistance = 60;
        categoryAxis.renderer.grid.template.disabled = true;
        categoryAxis.renderer.grid.template.strokeWidth = 0;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.min = 0;
        valueAxis.extraMax = 0.1;
        valueAxis.rangeChangeEasing = am4core.ease.linear;
        valueAxis.renderer.grid.template.strokeWidth = 0;
        valueAxis.rangeChangeDuration = 1500;

        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.categoryX = "name";
        series.dataFields.valueY = "value";
        series.tooltipText = "{name}: {valueY.value}"
        series.tooltip.fontSize = 12;
        series.columns.template.strokeOpacity = 0;
        series.columns.template.column.cornerRadiusBottomRight = 8;
        series.columns.template.column.cornerRadiusBottomLeft = 8;
        series.columns.template.column.cornerRadiusTopRight = 8;
        series.columns.template.column.cornerRadiusTopLeft = 8;
        series.interpolationDuration = 1500;
        series.interpolationEasing = am4core.ease.linear;
        series.columns.template.width = am4core.percent(50);
        series.columns.template.maxWidth = 25;
        series.columns.template.propertyFields.fill = "#aaff11";

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.disabled = true;
        chart.cursor.lineY.disabled = true;
        chart.cursor.behavior = "none";
    },
    beforeDestroy() {
        if (this.chart) {
            this.chart.dispose();
        }
    }
}
</script>

<style lang="scss">
.column-chart {
    height: 265px;
    min-height: 250px !important;
}
</style>
