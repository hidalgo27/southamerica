<script setup lang="ts">
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_southAmericaLow from "@amcharts/amcharts5-geodata/region/world/southAmericaLow";
import { useRouter } from 'vue-router';

const chartDiv = ref<HTMLElement | null>(null);
const router = useRouter();

onMounted(() => {
  if (chartDiv.value) {
    const root = am5.Root.new(chartDiv.value);
    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_southAmericaLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipHTML: `<div class="font-bold tracking-wide"> {name} </div>`,
      interactive: true,
      cursorOverStyle: "pointer",
    });

    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const countryName = ev.target.dataItem?.dataContext.name;
      if (countryName) {
        router.push(`/destinations/${countryName.toLowerCase()}`);
      }
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x677935),
    });

    const buttons = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100, // Mueve los botones a la derecha
        centerX: am5.p100,
        y: am5.p50,
        centerY: am5.p50,
        layout: root.verticalLayout, // Ajusta la disposición vertical
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0.3,
        }),
        visible: window.innerWidth >= 768,
      })
    );

    // Función para crear los botones de países
    function createCountryButton(countryName: string) {
      const button = buttons.children.push(
        am5.Button.new(root, {
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
          maxWidth: 150,
          centerX: am5.p50,
          width: 130,
          cursorOverStyle: "pointer",
          label: am5.Label.new(root, {
            text: countryName,
            fontSize: 14,
            textAlign: "center",

          }),
        })
      );

      // Hover: Resalta el país en el mapa
      button.events.on("pointerover", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.set("fill", am5.color(0x677935)); // Resalta el país en amarillo
          }
        });
      });

      // Hover Out: Quita el resaltado
      button.events.on("pointerout", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.set("fill", am5.color(0x6794DC));
          }
        });
      });

      // Click: Redirige a la página del país
      button.events.on("click", () => {
        router.push(`/destinations/${countryName.toLowerCase()}`);
      });
    }
    const countries = ["Brazil", "Argentina", "Peru", "Chile", "Colombia", "Ecuador", "Bolivia", "Paraguay", "Uruguay", "Venezuela", "Guyana", "Suriname", "French Guiana", "Falkland Islands"];
    countries.forEach(createCountryButton);
  }
});
</script>

<template>
  <section class="container my-20">
    <div ref="chartDiv" class="map-container rounded-md"></div>
  </section>
</template>

<style scoped>
.map-container {
  width: 100%;
  @apply h-[65vh]
}
</style>
