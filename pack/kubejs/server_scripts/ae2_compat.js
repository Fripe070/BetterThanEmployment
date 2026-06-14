ServerEvents.recipes((event) => {
    event.remove({ output: "ae2:crank" });

    event.remove({ output: "ae2:inscriber" });
    event.remove({ type: "ae2:inscriber" });

    const presses = [
        "ae2:engineering_processor_press",
        "ae2:calculation_processor_press",
        "ae2:logic_processor_press",
        "ae2:silicon_press",
    ];
    presses.forEach((press) => {
        event.recipes.create
            .deploying(press, [Ingredient.of("#c:storage_blocks/iron"), press])
            .keepHeldItem();
    });

    event.recipes.create
        .deploying("ae2:printed_silicon", ["ae2:silicon", "ae2:silicon_press"])
        .keepHeldItem();

    const processors = [
        [
            "mekanism:enriched_diamond",
            "ae2:engineering_processor_press",
            "ae2:printed_engineering_processor",
            "ae2:engineering_processor",
        ],
        [
            "ae2:certus_quartz_crystal",
            "ae2:calculation_processor_press",
            "ae2:printed_calculation_processor",
            "ae2:calculation_processor",
        ],
        [
            "create:golden_sheet",
            "ae2:logic_processor_press",
            "ae2:printed_logic_processor",
            "ae2:logic_processor",
        ],
    ];
    processors.forEach(([input, press, transitional, final]) => {
        event.recipes.create
            .sequenced_assembly(final, input, [
                event.recipes.create.deploying(transitional, [transitional, press]).keepHeldItem(),
                event.recipes.create.pressing(transitional, transitional),
                event.recipes.create.filling(transitional, [
                    transitional,
                    Fluid.of("productivemetalworks:molten_redstone", 100),
                ]),
                event.recipes.create.deploying(transitional, [transitional, "ae2:printed_silicon"]),
                event.recipes.create.pressing(transitional, transitional),
            ])
            .transitionalItem(transitional);
    });

    event.remove({ output: "ae2:charger" });
    event.remove({ type: "ae2:charger" });
    event.custom({
        type: "createaddition:charging",
        ingredients: [{ item: "minecraft:writable_book" }],
        results: [{ id: "ae2:guide" }],
        energy: 3200,
        max_charge_rate: 360,
    });
    event.custom({
        type: "createaddition:charging",
        ingredients: [{ item: "minecraft:compass" }],
        results: [{ id: "ae2:meteorite_compass" }],
        energy: 3200,
        max_charge_rate: 360,
    });
});
