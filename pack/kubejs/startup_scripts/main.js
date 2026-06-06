Platform.mods.kubejs.name = "BTE";

StartupEvents.registry("item", (event) => {
    event.create("basic_circuit");
    event.create("incomplete_advanced_circuit", "create:sequenced_assembly");
    event.create("advanced_circuit");

    event.create("plant_clay");
    event.create("plant_clay_pebbles");

    event.create("lead_sheet");
});
