import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

export default function PlantCategory() {
    const navigate = useNavigate();

    const { category } = useParams();


    const getImagesForCategory = () => {
        if (category === "Bonsai") {
            return [
                "/assets/Bonsai/Apple.jpg",
                "/assets/Bonsai/Mango.jpg",
                "/assets/Bonsai/Grapes.jpg",
                "/assets/Bonsai/Orange.jpg",
                "/assets/Bonsai/Bodhi.jpg",
                "/assets/Bonsai/Azalea.jpg",
                "/assets/Bonsai/MandarinCoolieHat.jpg",
                "/assets/Bonsai/Hibiscus.jpg"

            ];
        } else if (category === "flowers") {
            return [
                "/assets/Flowers/Hibiscus.jpg",
                "/assets/Flowers/hibiscusSap.jpg",
                "/assets/Flowers/Jasmine.jpg",
                "/assets/Flowers/jasmineSap.jpg",
                "/assets/Flowers/Orchid.jpg",
                "/assets/Flowers/orchidSap.jpg",
                "/assets/Flowers/Rose.jpg",
                "/assets/Flowers/roseSap.jpg"
            ];
        }
        else if (category === "fruits") {
            return [
                // "/assets/Fruits/apple.jpg",
                "/assets/Fruits/appleSapling.jpg",
                "/assets/Fruits/banana.jpg",
                "/assets/Fruits/bananaSapling.jpg",
                "/assets/Fruits/custardApple.jpg",
                "/assets/Fruits/custardSapling.jpg",
                "/assets/Fruits/guava.jpg",
                "/assets/Fruits/guavaSapling.jpg",
                "/assets/Fruits/mango.jpg",
                "/assets/Fruits/mangoSapling.jpg"
            ];
        }

        else if (category === "manure") {
            return [
                "/assets/Manure/Vermicompost.jpg",
                "/assets/Manure/cowdung.jpg",
                "/assets/Manure/greenVeg.jpg",
                "/assets/Manure/hasiruVermi.jpg",
                // "/assets/Manure/IndianOrganic.jpg",
                // "/assets/Manure/OrganicManureBio.jpg",
                // "/assets/Manure/perikali neem.jpg"

            ]
        }

        else if (category === "tools") {
            return [
                // "/assets/Tools/EasyGardening.jpg",
                "/assets/Tools/ToolBox.jpg",
                "/assets/Tools/leafRake.jpg",
                "/assets/Tools/spadeSet.jpg",
                // "/assets/Tools/TrupheGarden.jpg",
                "/assets/Tools/trupheGardenShears.jpg",
                // "/assets/Tools/GardeningKit.jpg",
                // "/assets/Tools/Gardenshears.jfif"
            ]
        }

        else if (category === "veggies") {
            return [
                "/assets/veggies/bitterguard.jpg",
                "/assets/veggies/bitterSap.jpg",
                "/assets/veggies/carrot.jpg",
                // "/assets/veggies/BitterGaurdSapling.jpg",
                // "/assets/veggies/carrotSap.jpg",
                "/assets/veggies/chilly.jpg",
                "/assets/veggies/chillySap.jpg",
                "/assets/veggies/ladySap.jpg",
                "/assets/veggies/ladysFinger.jpg",
                "/assets/veggies/pumkin.jpg",
                "/assets/veggies/pumkinSap.jpg",
                "/assets/veggies/tomato.jpg",
                "/assets/veggies/tomatoSap.jpg"


            ]
        }
    };


    const handleBonsaiClick = (imageName) => {
        // Redirect to displayProduct page with bonsai name and category as query parameters
        navigate(`/displayProduct?prodName=${imageName}&prodCat=${category}`);
        // <DisplayProduct category={category} productName={imageName} />

    };




    const images = getImagesForCategory();
    const getImageName = (imagePath) => {
        const parts = imagePath.split("/");
        const fileName = parts[parts.length - 1];
        const nameWithoutExtension = fileName.split(".")[0];
        return nameWithoutExtension;
    };

    return (
        <div>
            <div className="productsAvailable">
                <h2>Products Available</h2>
                <h3>{category === "Bonsai" ? "Bonsai" : category === "flowers" ? "Flowers" : category === "manure" ? "Manure" : category === "tools" ? " Gardening Tools" : category === "veggies" ? "Vegetable Saplings" : ""}</h3>

            </div>
            <div className="bonsai">
                {images.map((image, index) => (
                    <div className="fruitbonsai" key={index}>
                        <div className="bonsaiBox" onClick={() => handleBonsaiClick(getImageName(image))}>
                            <img src={image} alt={`${category} XXX`} />
                            <div className="box">
                                <h3>{`${getImageName(image)} ${category === "Bonsai" ? "" : category === "flowerSaplings" ? "Flowers" : category === "Tools" ? "Tools" : category === "veggies" ? "" : ""}`}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

