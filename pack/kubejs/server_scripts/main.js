ServerEvents.recipes((event) => {
    // Stop haivng mulitple types of rope
    event.replaceInput({ input: "farmersdelight:rope" }, "farmersdelight:rope", "#c:ropes");
    event.replaceOutput(
        { output: "farmersdelight:rope" },
        "farmersdelight:rope",
        "simulated:rope_coupling",
    );
    // More balanced with aeronautics costs
    event.remove({
        input: "farmersdelight:straw",
        output: "simulated:rope_coupling",
    });
    event.shapeless("1x simulated:rope_coupling", "4x farmersdelight:straw");

    // Unify bio fuel (prefer crafts and additions)
    event.remove({ type: "mekanism:crushing", output: "mekanism:bio_fuel" });
    event.replaceOutput(
        { output: "mekanism:bio_fuel" },
        "mekanism:bio_fuel",
        "createaddition:biomass",
    );
    event.replaceInput(
        { input: "mekanism:bio_fuel" },
        "mekanism:bio_fuel",
        "createaddition:biomass",
    );
    event.remove({ output: "mekanism:block_bio_fuel" });
    event.replaceInput(
        { input: "mekanism:block_bio_fuel" },
        "mekanism:block_bio_fuel",
        "createaddition:biomass_pellet_block",
    );

    // same as seed oil
    event.remove({ output: Fluid.of("createdieselgenerators:plant_oil") });

    // Hacky jetpack removal
    event.remove({ output: /.*jetpack.*/ });

    event.forEachRecipe({ type: "cataclysm:weapon_fusion" }, (recipe) => {
        const jsonRecipe = JSON.parse(recipe.json.toString());
        const transitional = jsonRecipe.base.item;
        event.recipes.create
            .sequenced_assembly(jsonRecipe.result.id, jsonRecipe.base.item, [
                event.recipes.create.deploying(transitional, [
                    transitional,
                    jsonRecipe.addition.item,
                ]),
                event.recipes.create.pressing(transitional, transitional),
            ])
            .transitionalItem(transitional);
        event.remove({
            type: "cataclysm:weapon_fusion",
            output: jsonRecipe.result.id,
            mod: "cataclysm",
        });
    });
    event.remove({ output: "cataclysm:mechanical_fusion_anvil" });

    event.remove({ output: "mekanism:cardboard_box" });

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
    });
    event.remove({ output: "createpropulsion:platinum_fluid_tank" });
    event.remove({ output: "createpropulsion:platinum_casing" });
    event.remove({ output: "createpropulsion:cable" });
    event.remove({ output: "createpropulsion:cable_relay" });
});
ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom("mekanism:bio_fuel");
    event.add("c:plates/lead", "kubejs:lead_sheet");
});

LootJS.lootTables((event) => {
    event.modifyLootTables().replaceItem("farmersdelight:rope", "simulated:rope_coupling");
});
