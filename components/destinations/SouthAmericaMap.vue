<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_southAmericaLow from "@amcharts/amcharts5-geodata/region/world/southAmericaLow";
import { useRouter } from "vue-router";

const chartDiv = ref<HTMLElement | null>(null);
const router = useRouter();
let root: am5.Root | null = null;

const countries = [
  "Brazil", "Argentina", "Peru", "Chile", "Colombia", "Ecuador",
  "Bolivia", "Paraguay", "Uruguay", "Venezuela", "Guyana",
  "Suriname", "French Guiana", "Falkland Islands"
];

onMounted(() => {
  if (chartDiv.value) {
    root = am5.Root.new(chartDiv.value);
    let myTheme = am5themes_Animated.new(root);

    root.setThemes([myTheme]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    const polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_southAmericaLow,
      })
    );

    polygonSeries.mapPolygons.template.setAll({
      tooltipHTML: `<div class="font-bold tracking-wide"> {name} </div>`,
      cursorOverStyle: "pointer",
      fill: am5.color(0xdae7f1),
      stroke: am5.color(0xffffff),
      strokeWidth: 1.5,
    });

    polygonSeries.mapPolygons.template.events.on("click", (ev) => {
      const countryName = ev.target.dataItem?.dataContext.name;
      if (countryName) {
        router.push(`/destinations/${countryName.toLowerCase()}`);
      }
    });

    polygonSeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x31456b),
    });

    function createButtonContainer(position: "left" | "right") {
      return chart.children.push(
        am5.Container.new(root!, {
          x: position === "left" ? 0 : am5.p100,
          centerX: position === "left" ? 0 : am5.p100,
          y: am5.p50,
          centerY: am5.p50,
          layout: root!.verticalLayout,
          paddingTop: 5,
          paddingRight: 8,
          paddingBottom: 5,
          paddingLeft: 8,

          background: am5.RoundedRectangle.new(root!, {
            fill: am5.color(0xf3f3f3),
            fillOpacity: 0,
          }),
          visible: window.innerWidth >= 768, // Oculta en móviles
        })
      );
    }

    const leftButtons = createButtonContainer("left");
    const rightButtons = createButtonContainer("right");

    function createCountryButton(countryName: string, container: am5.Container) {
      const button = container.children.push(
        am5.Button.new(root!, {
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
          maxWidth: 150,
          centerX: am5.p50,
          width: 130,
          cursorOverStyle: "pointer",
          marginBottom: 5,

          background: am5.RoundedRectangle.new(root!, {
            fill: am5.color(0xffffff),
            fillOpacity: 1,
            cornerRadiusTL: 50,
            cornerRadiusTR: 50,
            cornerRadiusBL: 50,
            cornerRadiusBR: 50,
            stroke: am5.color(0x31456b),
            strokeWidth: 0.3,
          }),
          label: am5.Label.new(root!, {
            text: countryName,
            fontSize: 14,
            textAlign: "center",
            fill: am5.color(0x31456b),
          }),
        })
      );
      button.events.on("pointerover", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.set("fill", am5.color(0x31456b));

          }
        });
      });

      button.events.on("pointerout", () => {
        polygonSeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === countryName) {
            polygon.set("fill", am5.color(0xdae7f1));
          }
        });
      });

      button.events.on("click", () => {
        router.push(`/destinations/${countryName.toLowerCase()}`);
      });
    }

    if (window.innerWidth >= 768) {
      countries.forEach((country, index) => {
        if (index % 2 === 0) {
          createCountryButton(country, leftButtons);
        } else {
          createCountryButton(country, rightButtons);
        }
      });
    }

  }
});

// Evento para limpiar memoria al desmontar
onBeforeUnmount(() => {
  if (root) {
    root.dispose();
  }
});
</script>

<template>
  <section class="container my-20">
    <div ref="chartDiv" class="hidden md:block map-container rounded-md w-full h-[70vh]"></div>
    <div class="flex flex-wrap  justify-center items-center text-center my-10 mx-auto gap-2 text-xs md:hidden">
      <NuxtLink v-for="country in countries" class="rounded-full border py-2 px-4 flex flex-wrap"
        :to="'/destinations/' + country.toLowerCase()">
        {{ country }}
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped></style>
