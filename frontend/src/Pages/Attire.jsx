import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const attires = [
  {
    id: 1,
    name: "Bridal Couture House",
    rating: 4.8,
    price: "₹ 1,75000 - 10,00000",
    location: "Pune",
    images: ["https://media.istockphoto.com/id/2148525120/photo/indian-newlywed-couple-performing-havan-ritual-together-with-priests-guidance.jpg?s=2048x2048&w=is&k=20&c=7YxdOLYumwHZ8O4w33lxO1PW4PUp3JTcifKKizAMNG0=","/images/a1.jpg","https://media.istockphoto.com/id/1174403060/photo/man-in-a-suit-correcting-his-bow-tie-morning-preparation-groom-at-home-fashion-photo-of-a-man.jpg?s=2048x2048&w=is&k=20&c=p__xfRlJLiR2ybAY9r4QRcE5GEogqmYNZXApbocU7Lk=","https://media.istockphoto.com/id/2200850366/photo/beautiful-bride-in-red-traditional-clothing-at-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=j90F9U4JqaGjNItUuw09xcDKUjyUG2sd7iI-ozjOHUs=", "/images/a2.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 2,
    name: "Designer Wedding Wear",
    rating: 4.9,
    price: "₹ 1,20,000 - 11,00000",
    location: "Mumbai",
    images: ["https://media.istockphoto.com/id/2199983544/photo/happy-bride-showing-bangles-to-groom-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=9GI94g642IHBXeRq4UGH5GUPud-dtQOwEzV-Xn57fuU=","/images/a3.webp","https://media.istockphoto.com/id/995628538/photo/many-luxury-wedding-dresses.jpg?s=2048x2048&w=is&k=20&c=0CnRY6r2c_0hZTRKOSwVM-b01DPQikxXte9xGXiRIME=","https://media.istockphoto.com/id/960630682/photo/happy-portrait-handsome-groom-in-a-wedding-suit-with-boutonniere-standing-near-the-window.jpg?s=2048x2048&w=is&k=20&c=KUI6RKYD7BThQevpxAIkdXQI9GIjt4xWWVB9GybC7nU=","https://media.istockphoto.com/id/2175977154/photo/indian-bride-in-traditional-red-bridal-attire-with-intricate-embroidery-and-gold-jewelry.jpg?s=1024x1024&w=is&k=20&c=HjNCu8dFBlvSbrPv1mHOtl2cAyFnSQjPdJUcmFgH3_8=", "/images/a4.webp"],
    phone: "+91 87654 32112",
  },
  {
    id: 3,
    name: "Elegant Bridal Studio",
    rating: 4.7,
    price: "₹ 90,000 - 9,00000",
    location: "Bangalore",
    images: ["https://media.istockphoto.com/id/2200854698/photo/loving-groom-and-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=hCiJomIzW2rcrvoyZEyfAvujZ_S4BFqboKx7cunsXxw=","/images/a2.jpg","https://media.istockphoto.com/id/1225025762/photo/wedding-dress-hanging-on-hangers.jpg?s=2048x2048&w=is&k=20&c=rkyEmvM8Tpxa-UiZMiYMPMcM--emntiZaO5uibXe4VQ=","https://media.istockphoto.com/id/1497656063/photo/portrait-of-a-groom-in-a-gray-plaid-suit-with-a-tie-in-a-light-bar.jpg?s=2048x2048&w=is&k=20&c=tTqaHDSrsMbQIay7jBQjs7GmlM5WKI_6mOqz5q1huWU=","https://media.istockphoto.com/id/2149946701/photo/portrait-of-indian-bride-wearing-dupatta.jpg?s=2048x2048&w=is&k=20&c=GXoQdIgNnoCl4pfywOcdU7OXMf2eoYsurPVBxiT7oJc=" ,"/images/a1.jpg"],
    phone: "+91 76543 21101",
  },
  {
    id: 4,
    name: "Royal Wedding Attire",
    rating: 4.6,
    price: "₹ 2,50000 - 25,00000",
    location: "Lucknow",
    images: ["https://media.istockphoto.com/id/2200870359/photo/groom-in-traditional-clothing-looking-at-camera-at-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=bLQ0WtOq_SvPcecpuS7zCbEWmCs3ZRQ3xP01kWJmqS8=","https://media.istockphoto.com/id/2165930380/photo/royalty.jpg?s=2048x2048&w=is&k=20&c=1ZIpm1HKBcdb7b0COfcxYZ8mZKz3H9beNHehR8IM0Uw=","https://media.istockphoto.com/id/2200850333/photo/bride-with-dupatta-on-head-looking-down-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=k_Smom1XAf6VqpvlrCzliVSmelpGLkuUd-by_9YzglE=","https://media.istockphoto.com/id/2242292561/photo/indian-brides-traditional-wedding-outfit-textile-fabric-and-pattern-close-up.jpg?s=2048x2048&w=is&k=20&c=NlCfcZbbzbXbQrrK8lQO-JcPZnFwGBTBhYmYeb_QMVA=","https://media.istockphoto.com/id/2187535521/photo/beautiful-smiling-indian-bride-in-traditional-bridal-lehenga-with-heavy-jewelry.jpg?s=2048x2048&w=is&k=20&c=Dj6U2c-N6_lRIm2A4mm5qU9KAufhDkxY65KEzpo2J84=" ,"https://media.istockphoto.com/id/2200637489/photo/happy-bride-and-groom-in-traditional-clothing-dancing-on-white-background.jpg?s=2048x2048&w=is&k=20&c=rfFSTBgeEoR73OWcSI5IYV5Abr8iDwIYs9B-UyeU1n8="],
    phone: "+91 65432 10990",
  },
  {
    id: 5,
    name: "Blissful Bride Boutique",
    rating: 4.8,
    price: "₹ 75,000 - 10,00000",
    location: "Delhi",
    images: ["https://media.istockphoto.com/id/155360190/photo/indian-bride-and-groom-outdoors.jpg?s=2048x2048&w=is&k=20&c=bVNgvl_lP9QFzmvLIvBA85OkdBaSMBl41wtCkkdHLHo=","/images/a4.jpg","https://media.istockphoto.com/id/1339458177/photo/white-beige-range-of-clothes-hangs-on-hangers-in-boutique.jpg?s=2048x2048&w=is&k=20&c=eR_epMlXPLSBEw7ag9VJIYMSwEsbkoPdob5oeKKV-OE=","https://media.istockphoto.com/id/1220547446/photo/elegant-groom-in-suit-businessman.jpg?s=2048x2048&w=is&k=20&c=hQh0nj3aQDwlEnxSSqq3GxZLVIUZd0_PgXI23fWfHPs=","https://media.istockphoto.com/id/1810851006/photo/indian-woman-adorned-in-traditional-lehenga-and-gold-jewelry-standing-with-her-hands-folded.jpg?s=2048x2048&w=is&k=20&c=H-gpkHYllXXXttSFd77PY8QpabKfmwq9lcRDQ9mBDLQ=" ,"/images/a2.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 6,
    name: "Wedding Whispers",
    rating: 4.9,
    price: "₹ 1,20,000 - 9,50000",
    location: "Mumbai",
    images: ["https://media.istockphoto.com/id/1225968488/photo/indian-rich-marriage-ceremony.jpg?s=2048x2048&w=is&k=20&c=lEQ2uwBXdGgOzsw6X556IO5ken4CGj-xoSto0oVs6AY=","/images/a15.jpg","https://media.istockphoto.com/id/1491876236/photo/shallow-depth-of-field-details-with-wedding-dresses-on-display-in-a-shop.jpg?s=2048x2048&w=is&k=20&c=WaNyyhZRzd9eHwrZ1E3PZmn1Q9Be_bpUy4qkfw42loc=","https://media.istockphoto.com/id/2112058221/photo/a-beautiful-young-bride-in-a-summer-park-is-walking-to-her-groom-photo-of-the-groom-in-the.jpg?s=1024x1024&w=is&k=20&c=dOuR_gauqAfheZMWBZvi7h32HeJCpUKPQKaHDcbTqCU=","https://media.istockphoto.com/id/1810850849/photo/stunning-indian-bride-dressed-in-traditional-red-bridal-lehenga-with-heavy-gold-jewellery-and.jpg?s=2048x2048&w=is&k=20&c=F8jjeA5F_KvjcaBB_nKMRiYt8aAlmyjh7c8hRbA79zU=", "/images/a5.jpg"],
    phone: "+91 87654 32112",
  },
  {
    id: 7,
    name: "Love and Lace Bridal Studio",
    rating: 4.7,
    price: "₹ 90,000 - 9,00000",
    location: "Bangalore",
    images: ["https://media.istockphoto.com/id/489247232/photo/happy-indian-couple-at-their-wedding.jpg?s=1024x1024&w=is&k=20&c=plKQ5ceiIEg8fI8I3EwxQb3SY-y66MnxUeOgqsVMFNA=","/images/a6.jpg","https://media.istockphoto.com/id/1085741022/photo/portrait-of-the-bride-and-groom-in-nature-beautiful-couple-in-love.jpg?s=2048x2048&w=is&k=20&c=u6yCHOzfytV_2O8RhY-aDGE2p8G2EaZHLADI0Zk9HEU=","https://media.istockphoto.com/id/2200817252/photo/close-up-portrait-of-beautiful-bride-in-traditional-dress-and-jewelry-posing.jpg?s=2048x2048&w=is&k=20&c=QXZCi7pGh0Gx4DhclUwqvbYK-nkbam-8yU2BJPEhi-Q=" ,"/images/a1.jpg"],
    phone: "+91 76543 21101",
  },
  {
    id: 8,
    name: "Wedding Chic",
    rating: 4.6,
    price: "₹ 85,000 -11,00000",
    location: "Lucknow",
    images: ["https://media.istockphoto.com/id/2200639341/photo/loving-couple-holding-hands-and-looking-at-each-other-on-white-background.jpg?s=2048x2048&w=is&k=20&c=SnYektEKvW_SpCdenwQWMd58-9Kw0vcBiGARl81Rh7c=","/images/a7.jpg","https://media.istockphoto.com/id/2180166290/photo/happy-smiling-newlywed-bride-and-groom-walk-outside.jpg?s=2048x2048&w=is&k=20&c=FlFLrWYB1dmrK1pAJsG7iuXEYsMQwAHvKU7QGb8MTak=","https://media.istockphoto.com/id/2200631854/photo/happy-bride-in-traditional-clothing-dancing-over-white-background.jpg?s=2048x2048&w=is&k=20&c=SbgiZ1RUCfHL_SxGahX3DcQp0alR_BA8Qae7iqIEUn4=", "/images/a16.jpg"],
    phone: "+91 65432 10990",
  },
  {
    id: 9,
    name: "Dress Den",
    rating: 4.8,
    price: "₹ 75,000 - 7,50000",
    location: "Delhi",
    images: ["https://media.istockphoto.com/id/2200844553/photo/newlywed-couple-holding-hands-on-white-background.jpg?s=2048x2048&w=is&k=20&c=WLBI95f_OxVVJgdVnVmDCwAMBVruaEvKSIcaYfgn9Io=","/images/a17.jpg","https://media.istockphoto.com/id/2180166291/photo/groom-and-bride-with-bouquet-during-wedding-ceremony-close-up.jpg?s=2048x2048&w=is&k=20&c=fb_EhRr0gPLrshs-lNfvDdl0nc0hZb0jzVpGJUSWnLU=","https://media.istockphoto.com/id/2149961550/photo/stunning-indian-bride-dressed-in-traditional-bridal-lehenga-with-heavy-gold-jewellery-and.jpg?s=2048x2048&w=is&k=20&c=6n_HSGXdRQ44dO6l596MQghiIDyBN8WqTkfE9geQU70=", "/images/a8.jpg"],
    phone: "+91 98765 43213",
  },
  {
    id: 10,
    name: "Veil & Vow",
    rating: 4.9,
    price: "₹ 1,20,000 - 10,00000",
    location: "Pune",
    images: ["https://media.istockphoto.com/id/1321755018/photo/attractive-happy-north-indian-couple-in-traditional-dress.jpg?s=1024x1024&w=is&k=20&c=29FdyvfiO3tLzy5RKU0Kxprl2C1lUu57CQEwARQEtrM=","/images/a18.jpg","https://media.istockphoto.com/id/1872497505/photo/the-groom-in-a-brown-suit-and-the-bride-in-a-white-dress.jpg?s=2048x2048&w=is&k=20&c=G_lyY8N3TCnsA3Ay4lar3xS7i6H9IiUvMYAamYd4kog=","https://media.istockphoto.com/id/1137566569/photo/beautiful-indian-girl-in-bride-look-wearing-red-lehanga-and-gold-jewellery.jpg?s=2048x2048&w=is&k=20&c=LQLrwIVXFBEFEeBjNFF2-Le2bBy7Hj8ilkVHPiKG_3c=", "/images/a9.jpg"],
    phone: "+91 87654 32112",
  },
  {
    id: 11,
    name: "Alexander McQueen and Givenchy",
    rating: 4.7,
    price: "₹ 2,90,000 - 19,00000",
    location: "Bangalore",
    images: ["https://media.istockphoto.com/id/484227639/photo/traditional-ladies-wear-saries-at-marketplace-madhya-pradesh.jpg?s=2048x2048&w=is&k=20&c=PXIM2RQPBVv9BtSAn-LV1WPUEbRytXwBpRf-Dnik_fU=","https://media.istockphoto.com/id/517465027/photo/traditional-ladies-wear-sarees.jpg?s=2048x2048&w=is&k=20&c=JmoXnSeQIy7eGPS-shJuvIq2f9NnO4PZ8gnCagh8kxg=","/images/a19.jpg","https://media.istockphoto.com/id/2235000516/photo/portrait-of-very-beautiful-young-indian-bride-in-luxurious-bridal-costume-with-makeup-and.jpg?s=2048x2048&w=is&k=20&c=S-DPa5cLlFKdLokIsoPMXF00b1iB6gqnS1Ffn51Qcf0=","https://media.istockphoto.com/id/2200874881/photo/loving-groom-looking-at-bride-in-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=NnZkm8DnV2igmuuMx1APvrY7z1HO1nKiog0ADQM7hQs=","https://media.istockphoto.com/id/2148524188/photo/indian-bride-and-groom-taking-a-happy-glance-of-each-other-as-they-take-circles-around-the.jpg?s=2048x2048&w=is&k=20&c=dL_osHpUhk-ndXDMUugI35PIXn7-TpmBXcT0udoAR-4=", "https://media.istockphoto.com/id/1432842171/photo/indian-groom-getting-ready-for-his-wedding-ceremony.jpg?s=2048x2048&w=is&k=20&c=A6e1KkkbQMFTS3mXJK24PxTzedijI4dSgR13IKAAfpQ=","https://media.istockphoto.com/id/1478130654/photo/punjabi-culture.jpg?s=1024x1024&w=is&k=20&c=wYmaHTbTOZNulPI1HUGzMpNC7N6lJaekyQNLoGJeyOY="],
    phone: "+91 76543 21101",
  },
  {
    id: 12,
    name: "Dream Dress",
    rating: 4.6,
    price: "₹ 85,000 - 9,50000",
    location: "Lucknow",
    images: ["https://media.istockphoto.com/id/937881602/photo/attractive-happy-south-indian-couple-in-traditional-dress.jpg?s=2048x2048&w=is&k=20&c=np00iM8uk_HlEHAxFj4Ws56vsW_B4UkvQasiA10LpZk=","/images/a20.jpg","https://media.istockphoto.com/id/1497671387/photo/newlyweds-walk-in-the-city-near-old-buildings.jpg?s=2048x2048&w=is&k=20&c=lr0AAVJPcojm1yoiUETWdL6dPAc6Lz07W6v1h8UWhxo=", "https://media.istockphoto.com/id/1213798493/photo/young-indian-woman-in-bridal-wear-jewelry-and-make-up.jpg?s=1024x1024&w=is&k=20&c=zzmA_v88zwVCxFn0lGG0OLpGYbtMe7PBAR4uSxtFw-8=","/images/a11.jpg"],
    phone: "+91 65432 10990",
  },
  
];

// Custom arrows for carousel
const NextArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="slick-arrow"
    style={{
      position: "absolute",
      right: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaArrowRight style={{ color: "#d1d5db", fontSize: 20 }} />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    onClick={onClick}
    className="slick-arrow"
    style={{
      position: "absolute",
      left: 10,
      top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      cursor: "pointer",
      background: "rgba(0,0,0,0.5)",
      borderRadius: "50%",
      width: 40,
      height: 40,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <FaArrowLeft style={{ color: "#d1d5db", fontSize: 20 }} />
  </div>
);

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const handleCardClick = (e) => {
    // Prevent navigation if user clicks on arrow or dot
    if (e.target.closest(".slick-arrow") || e.target.closest(".slick-dots")) return;
    navigate(`/attire/${service.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        cursor: "pointer",
      }}
    >
      <Slider {...sliderSettings}>
        {service.images.map((img, index) => (
          <div key={index}>
            <img
              src={img}
              alt={`${service.name} ${index + 1}`}
              style={{ width: "100%", height: 180, objectFit: "contain",backgroundColor:"#f0f0f0" }}
            />
          </div>
        ))}
      </Slider>

      <div style={{ padding: 16 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 600 }}>
          {service.name}
        </h3>
        <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
          <FaStar style={{ color: "#fbbf24", marginRight: 4 }} />
          <span style={{ fontSize: 14, color: "#555" }}>{service.rating}</span>
          <span style={{ margin: "0 8px", color: "#ccc" }}>•</span>
          <span style={{ fontSize: 14, color: "#555" }}>{service.location}</span>
        </div>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: "#059669",
            marginBottom: 12,
          }}
        >
          {service.price}
        </div>

        <a
          href={`https://wa.me/${service.phone.replace(/\D/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            width: "100%",
            textAlign: "center",
            background: "#059669",
            color: "#fff",
            padding: "12px 0",
            borderRadius: 8,
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 14,
          }}
        >
          Order Now
        </a>
      </div>
    </div>
  );
};

const Attire = () => {
  return (
    <div className="attire-page" style={{ padding: "40px 24px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>
        Wedding Attire
      </h1>
      <p style={{ color: "#6b7280", marginBottom: 32 }}>
        Explore beautiful wedding outfits for brides and grooms — click on any attire to see details and order via WhatsApp.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: 20,
        }}
      >
        {attires.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Attire;
