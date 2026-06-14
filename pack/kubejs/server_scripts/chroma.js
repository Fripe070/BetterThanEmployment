ServerEvents.recipes((event) => {
    // Remove default recipes
    event.remove({ output: /ae2:.+_lumen_paint_ball/ });

    const usedColors = ["red", "orange", "yellow", "green", "cyan", "blue", "purple"];
    const balls = usedColors.map((color) => `ae2:${color}_paint_ball`);
    const chargedBalls = usedColors.map((color) => `ae2:${color}_lumen_paint_ball`);
    const lastBall = "ae2:matter_ball";

    const chromatic = "kubejs:chromatic_compound";
    const chromaticCharged = "kubejs:charged_chromatic_compound";
    const transitional = "kubejs:unrefined_radiance";
    const radiant = "create:refined_radiance";

    event.shapeless(chromatic, ["create:polished_rose_quartz"].concat(balls));
    event.custom({
        type: "createaddition:charging",
        ingredients: [{ item: chromatic }],
        results: [{ id: chromaticCharged }],
        energy: 3200,
        max_charge_rate: 360,
    });
    event.recipes.create.crushing(
        chargedBalls.map((ball) => CreateItem.of(ball, 4 / 5)),
        chromaticCharged,
    );
    chargedBalls.forEach((charged, i) => {
        const nextBall = chargedBalls[i + 1] ?? lastBall;
        event.recipes.create.emptying(
            [Item.of(nextBall), Fluid.of("kubejs:concentrated_chroma", 10)],
            Ingredient.of(charged),
        );
    });

    event.recipes.create
        .sequenced_assembly(radiant, "create_aquatic_ambitions:prismarine_alloy", [
            event.recipes.create.filling(transitional, [
                transitional,
                Fluid.of("kubejs:concentrated_chroma", 800),
            ]),
            event.recipes.create.pressing(transitional, transitional),
        ])
        .loops(5)
        .transitionalItem(transitional);

    // Undo the charge
    chargedBalls.forEach((charged, i) => {
        event.recipes.create.crushing(balls[i], charged);
    });

    event.replaceInput(
        { output: "ae2:controller" },
        "ae2:smooth_sky_stone_block",
        "create:refined_radiance",
    );

    event.replaceInput(
        { output: /ae2:cell_component_.+/, not: { output: "ae2:cell_component_1k" } },
        "#c:dusts",
        "create:refined_radiance",
    );
    event.replaceInput(
        { output: /ae2:spatial_cell_component_.+/ },
        "#c:dusts",
        "create:refined_radiance",
    );
});
