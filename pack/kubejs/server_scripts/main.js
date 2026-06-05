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

    // event.forEachRecipe({ type: "mekanism:crushing" }, (recipe) => {
    //     const jsonRecipe = JSON.parse(recipe.json.toString());
    //     event.custom({
    //         type: "create:crushing",
    //         ingredients: [jsonRecipe.input],
    //         processing_time: 100.0,
    //         results: [recipe.originalRecipeResult],
    //     });
    //     event.remove({ id: recipe.id });
    // });
});
ServerEvents.tags("item", (event) => {
    event.removeAllTagsFrom("mekanism:bio_fuel");
});

LootJS.lootTables((event) => {
    event
        .modifyLootTables(LootType.CHEST)
        .replaceItem("farmersdelight:rope", "simulated:rope_coupling");
});
