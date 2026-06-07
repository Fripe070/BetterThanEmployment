Platform.mods.kubejs.name = "BTE";

StartupEvents.registry("item", (event) => {
    event.create("plant_clay");
    event.create("plant_clay_pebbles");

    event.create("lead_sheet");
});
