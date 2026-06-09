Platform.mods.kubejs.name = "BTE";

StartupEvents.registry("item", (event) => {
    event.create("plant_clay");
    event.create("plant_clay_pebbles");
    event.create("lead_sheet");
    event.create("incomplete_basic_control_circuit");
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
            .tickRate(20)
            .type((type) => type.motionScale(0.5).temperature(1000).pathType("damage_fire"));
    };
    molten("Redstone", "#a80f01");
});
