ServerEvents.recipes((event) => {
    event.replaceInput(
        { input: "createpropulsion:platinum_sheet" },
        "createpropulsion:platinum_sheet",
        "#c:plates/lead",
    );
    ["nuggets", "ingots", "storage_blocks", "plates"].forEach((type) => {
        event.replaceInput(
            {
                input: `#c:${type}/platinum`,
                not: {
                    id: /.*platinum.*/,
                },
            },
            `#c:${type}/platinum`,
            `#c:${type}/lead`,
        );
        event.remove({ output: `#c:${type}/platinum` });
    });
    event.remove({ output: "createpropulsion:platinum_fluid_tank" });
    event.remove({ output: "createpropulsion:platinum_casing" });
    event.remove({ output: "createpropulsion:cable" });
    event.remove({ output: "createpropulsion:cable_relay" });

    event.remove({ output: "createpropulsion:raw_platinum" });
    event.remove({ output: "createpropulsion:raw_platinum_block" });
    event.remove({ output: "create:crushed_raw_platinum" });
});
ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom("mekanism:bio_fuel");
    event.add("c:plates/lead", "kubejs:lead_sheet");
});
