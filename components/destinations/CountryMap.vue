<script lang="ts" setup>
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_data_countries2 from "@amcharts/amcharts5-geodata/data/countries2";

const chartDiv = ref<HTMLElement | null>(null);
const router = useRouter();
const regions = [
  "Amazonas", "Ancash", "Apurimac", "Arequipa", "Ayacucho", "Cajamarca", "El Callao", "Cusco", "Huancavelica", "Huánuco",
  "Ica", "Junin", "La Libertad", "Lambayeque", "Lima Province", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura",
  "Puno", "San Martin", "Tacna", "Tumbes", "Ucayali", "Lake Titicaca"
];
onMounted(() => {
  if (chartDiv.value) {
    const root = am5.Root.new(chartDiv.value);

    root.setThemes([am5themes_Animated.new(root)]);

    const chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "rotateX",
        projection: am5map.geoMercator(),
        layout: root.horizontalLayout,
      })
    );

    const countrySeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        visible: true,
      })
    );

    countrySeries.mapPolygons.template.setAll({
      tooltipText: "{name}",
      interactive: true,
      cursorOverStyle: "pointer",
      fill: am5.color(0xdae7f1),
      stroke: am5.color(0xffffff),
      strokeWidth: 1.5,
    });


    countrySeries.mapPolygons.template.states.create("hover", {
      fill: am5.color(0x31456b),
    });

    let countryData = am5geodata_data_countries2["PE"];

    if (countryData && countryData.maps.length) {
      let map = countryData.maps[0];
      am5.net.load(`https://cdn.amcharts.com/lib/5/geodata/json/${map}.json`, chart)
        .then((result) => {
          let geoJSON = am5.JSONParser.parse(result.response);
          countrySeries.setAll({
            geoJSON: geoJSON,
            fill: am5.color(0xdae7f1),
          });
        })
        .catch((error) => console.error("Error al cargar el mapa:", error));
    } else {
      console.error("No se encontró el mapa para Perú.");
    }

    // Contenedor de botones a la izquierda
    const leftButtons = chart.children.push(
      am5.Container.new(root, {
        x: 0,
        centerX: 0,
        y: am5.p50,
        centerY: am5.p50,
        layout: root.verticalLayout,
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xf3f3f3),
          fillOpacity: 0,
        }),
        visible: window.innerWidth >= 768,
      })
    );

    // Contenedor de botones a la derecha
    const rightButtons = chart.children.push(
      am5.Container.new(root, {
        x: am5.p100,
        centerX: am5.p100,
        y: am5.p50,
        centerY: am5.p50,
        layout: root.verticalLayout,
        paddingTop: 5,
        paddingRight: 8,
        paddingBottom: 5,
        paddingLeft: 8,
        background: am5.RoundedRectangle.new(root, {
          fill: am5.color(0xffffff),
          fillOpacity: 0,
        }),
        visible: window.innerWidth >= 768,
      })
    );

    function createRegionButton(regionName, container) {
      const button = container.children.push(
        am5.Button.new(root, {
          paddingTop: 5,
          paddingRight: 10,
          paddingBottom: 5,
          paddingLeft: 10,
          maxWidth: 150,
          centerX: am5.p50,
          width: 130,
          marginBottom: 5,
          cursorOverStyle: "pointer",
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
            text: regionName,
            fontSize: 14,
            textAlign: "center",
            fill: am5.color(0x31456b),
          }),
        })
      );

      button.events.on("pointerover", () => {
        countrySeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === regionName) {
            polygon.set("fill", am5.color(0x31456b));
            polygon.set("fillOpacity", 300);
          }
        });
      });

      button.events.on("pointerout", () => {
        countrySeries.mapPolygons.each((polygon) => {
          if (polygon.dataItem?.dataContext.name === regionName) {
            polygon.set("fill", am5.color(0xdae7f1));
          }
        });
      });

      button.events.on("click", () => {
        router.push(`/destinations/peru/${regionName.toLowerCase().replace(/ /g, "-")}`);
      });
    }

    countrySeries.mapPolygons.template.events.on("click", (ev) => {
      const regionName = ev.target.dataItem?.dataContext.name;
      if (regionName) {
        const newRoute = `/destinations/peru/${regionName.toLowerCase().replace(/ /g, "-")}`;
        if (router.currentRoute.value.path === newRoute) {
          router.replace({ path: "/redirect" }).then(() => {
            router.replace(newRoute);
          });
        } else {
          router.push(newRoute);
        }
      }
    });
    // Distribuir los botones en los dos contenedores
    regions.forEach((region, index) => {
      if (index % 2 === 0) {
        createRegionButton(region, leftButtons);
      } else {
        createRegionButton(region, rightButtons);
      }
    });
  }
});


</script>
<template>
  <section class="container my-20">
    <div ref="chartDiv" class="hidden md:block map-container rounded-md w-full h-[75vh]"></div>
    <div class="flex flex-wrap  justify-center items-center text-center my-10 mx-auto gap-2 text-xs md:hidden">
      <NuxtLink v-for="region in regions" class="rounded-full border py-2 px-4 flex flex-wrap"
        :to="'/destinations/peru/' + region.toLowerCase().replace(/ /g, '-')">
        {{ region }}
      </NuxtLink>
    </div>
  </section>
</template>
<style></style>