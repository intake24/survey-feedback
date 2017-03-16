import {Component} from "@angular/core";
import {SELECTOR_PREFIX} from "../feedback.const";

@Component({
    selector: SELECTOR_PREFIX + "result-list",
    templateUrl: "./result-list.component.html",
    styleUrls: ["../../../../node_modules/bootstrap/scss/bootstrap.scss",
        "../../../../node_modules/font-awesome/scss/font-awesome.scss",
        "./result-list.component.scss"]
})

export class ResultListComponent {

    results: any = [
        {
            smileType: "scales",
            title: "Lose some weight",
            description: "Normal weight for you is around 75kg. Reduce the consumption of these products " +
            "until you gain a normal weight:" +
            "<ul class='fa-ul'>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Raisins</li>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Cheese</li>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Ice cream</li>" +
            "</ul>"
        },
        {
            smileType: "battery",
            title: "You get a good amount of energy",
            description: "You daily calorie intake should fit into 2,000-2,500 kcal."
        },
        {
            smileType: "bread",
            title: "Your carbs and fibre intake is good",
            description: "Starchy foods (bread, rice, pasta, potatoes," +
            "cornmeal, yams, couscous and breakfast cereals) should be around third of your diet.",
        },
        {
            smileType: "egg",
            title: "You should consume more proteins",
            description: "Make sure your diet includes meat, game and poultry, white fish, shellfish" +
            "nuts, eggs, beans and other legumes."
        },
        {
            smileType: "apple",
            title: "The amount of fruits and vegetables in your diet deserves applause",
            description: "Ideally you should be eating five or more portions of fruits and vegetables each day."
        },
        {
            smileType: "sausage",
            title: "You shouldn't eat saturated fat that much",
            description: "Reduce products saturated fat products to a minimum. Exclude these from your diet:" +
            "<ul class='fa-ul'>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Pork sausages</li>" +
            "</ul>"
        },
        {
            smileType: "salmon",
            title: "The intake of healthy fat is good",
            description: "Products like fish and olive oil are great sources of healthy fats"
        },
        {
            smileType: "candy",
            title: "That amount of sugar you get is shocking!",
            description: "Reduce rich sugar products (sweets, soda and cakes) to a minimum." +
            "You can replace those with fruits and dark chocolate. Exclude these from your diet:" +
            "<ul class='fa-ul'>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Snickers</li>" +
            "<li><i class='fa-li fa fa-times text-danger'></i> Mars</li>" +
            "</ul>"
        },
        {
            smileType: "milk",
            title: "You diary intake is on a great level. Keep it up!",
            description: "Milk, cheese, yoghurt and fromage frais are good sources of protein and" +
            "some vitamins, and they're also an important source of calcium, which helps to keep our" +
            "bones strong. Try to go for lower-fat and lower-sugar products where possible, like 1% fat" +
            "milk, reduced-fat cheese or plain low-fat yoghurt."
        },

    ];

    diets: any = [
        {
            src: "/img/salmon-pic.jpg",
            title: "Salmon",
            howMany: "At least 2 portions a week. Portion is around 140g.",
            sourceOf: ["healthy fats", "protein", "Vitamin D"]
        },

        {
            src: "/img/egg-pic.jpg",
            title: "Eggs",
            howMany: "No more than 3 whole eggs a day",
            sourceOf: ["healthy fats", "protein"]
        },

        {
            src: "/img/blue-pic.jpg",
            title: "Blueberries",
            howMany: "50g a day",
            sourceOf: ["Vitamin B", "Vitamin E"]
        },
    ];

}
