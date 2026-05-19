Platform.mods.kubejs.name = "BTE";

StartupEvents.registry("item", (event) => {
    event.create("basic_circuit");
    event.create("incomplete_advanced_circuit", "create:sequenced_assembly");
    event.create("advanced_circuit");

    event.create("plant_clay");
    event.create("plant_clay_pebbles");
});

StartupEvents.registry("fluid", (event) => {
    let molten = (name, color, overlay) => {
        let id = "molten_" + name.toLowerCase().replace(" ", "_");
        let hexColor = Number.parseInt(color.replace("#", ""), 16);
        return event
            .create(id, "kubejs:thick")
            .displayName("Molten " + name)
            .tint(hexColor)
            .levelDecreasePerBlock(2)
            .tickRate(20);
    };
    // molten("Redstone", "#a80f01");
});
