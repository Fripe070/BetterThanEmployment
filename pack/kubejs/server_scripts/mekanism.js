// Crusher
ServerEvents.recipes((event) => {
    event.forEachRecipe({ type: "mekanism:crushing" }, (recipe) => {
        if (
            !((recipe) => {
                const result = recipe.originalRecipeResult;
                if (result.hasTag("c:dusts/obsidian")) return false;
                if (result.hasTag("c:dusts")) return true;
                if (result.hasTag("mekanism:dirty_dusts")) return true;
                if (result.id === "mekanism:dirty_netherite_scrap") return true;

                return false;
            })(recipe)
        )
            return;

        const jsonRecipe = JSON.parse(recipe.json.toString());
        event.custom({
            type: "create:crushing",
            ingredients: [jsonRecipe.input],
            processing_time: 100.0,
            results: [recipe.originalRecipeResult],
        });
        event.remove({
            type: "mekanism:crushing",
            output: recipe.originalRecipeResult,
            mod: "mekanism",
        });
    });

    event.recipes.create.crushing(
        ["4x minecraft:wind_charge", CreateItem.of("3x minecraft:wind_charge", 0.5)],
        "minecraft:breeze_rod",
    );

    event.remove({ type: "mekanism:crushing" });
    event.remove({ mod: "mekanism", output: "mekanism:crusher" });
    event.remove({ mod: "mekanism", output: /_crushing_factory$/ });

    // Use create belts
    event.remove({ id: /mekanism:transmitter\/mechanical_pipe\// });
    // Use create pipes
    event.remove({ mod: "mekanism", output: /_transporter$/ });
});

ServerEvents.recipes((event) => {});
