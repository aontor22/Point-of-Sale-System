import lenovo from "../assets/Inventory/lenovo.png"
import beats from "../assets/Inventory/beats.png"
import nike from "../assets/Inventory/nike.png"
import apple from "../assets/Inventory/apple.png"
import amazon from "../assets/Inventory/amazon.png"
import woodmart from "../assets/Inventory/woodmart.png"
import dior from "../assets/Inventory/dior.png"
import lava from "../assets/Inventory/lava.png"
import nikamal from "../assets/Inventory/nilkamal.png"
import theNorthFace from "../assets/Inventory/thenorthface.png"

const baseBrands = [
    {
        name: "Lenovo",
        image: lenovo,
        createdDate: "24 Dec 2024",
        status: "Active",
    },
    {
        name: "Beats",
        image: beats,
        createdDate: "10 Dec 2024",
        status: "Active",
    },
    {
        name: "Nike",
        image: nike,
        createdDate: "27 Nov 2024",
        status: "Active",
    },
    {
        name: "Apple",
        image: apple,
        createdDate: "18 Nov 2024",
        status: "Active",
    },
    {
        name: "Amazon",
        image: amazon,
        createdDate: "06 Nov 2024",
        status: "Active",
    },
    {
        name: "Woodmart",
        image: woodmart,
        createdDate: "25 Oct 2024",
        status: "Active",
    },
    {
        name: "Dior",
        image: dior,
        createdDate: "14 Oct 2024",
        status: "Active",
    },
    {
        name: "Lava",
        image: lava,
        createdDate: "03 Oct 2024",
        status: "Active",
    },
    {
        name: "Nikamal",
        image: nikamal,
        createdDate: "20 Sep 2024",
        status: "Active",
    },
    {
        name: "The North Face",
        image: theNorthFace,
        createdDate: "10 Sep 2024",
        status: "Active",
    },
];

const brandImages = [
    lenovo,
    beats,
    nike,
    apple,
    amazon,
    woodmart,
    dior,
    lava,
    nikamal,
    theNorthFace,
];

function randomDate() {
    const start = new Date(2023, 0, 1);
    const end = new Date(2025, 11, 31);
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toDateString().slice(4);
}

const demoBrands = Array.from({ length: 200 }, (_, i) => {
    const id = i + baseBrands.length + 1;

    return {
        name: `Brand ${id}`,
        image: brandImages[Math.floor(Math.random() * brandImages.length)],
        createdDate: randomDate(),
        status: "Active",
    };
});

const BRAND_ROWS = [...baseBrands, ...demoBrands];
export default BRAND_ROWS;
