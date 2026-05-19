ServerEvents.recipes((event) => {
    event.shaped(
        "kubejs:basic_circuit",
        // prettier-ignore
        [
            " G ",
            "III",
            "CCC"
        ],
        {
            G: "create:golden_sheet",
            I: "create:iron_sheet",
            C: "create:copper_nugget",
        },
    );

    event.recipes.create.mechanical_crafting(
        "kubejs:incomplete_advanced_circuit",
        // prettier-ignore
        [
            "  Q  ", 
            "PPOPP", 
            " CCC ",
        ],
        {
            O: "kubejs:basic_circuit",
            Q: "create:polished_rose_quartz",
            P: "create:brass_sheet",
            C: "create:copper_nugget",
        },
    );
    event.recipes.create
        .sequenced_assembly(
            [
                CreateItem.of("kubejs:advanced_circuit", 0.9),
                CreateItem.of("create:golden_sheet", 0.1),
            ],
            "kubejs:incomplete_advanced_circuit",
            [
                event.recipes.create.pressing(
                    "kubejs:advanced_circuit",
                    "kubejs:incomplete_advanced_circuit",
                ),
            ],
        )
        .transitionalItem("kubejs:incomplete_advanced_circuit");
});
