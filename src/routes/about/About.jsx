import "./about.css";
import Nav from "../../components/nav/Nav";
import Footer from "../../components/footer/Footer";
import IMG1 from "../../assets/bridle_medium_brown.jpeg";
import IMG2 from "../../assets/harness_buck_brown.jpeg";
import IMG3 from "../../assets/contact-img.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="page-wrapper">
      <Nav />
      <div className="about_section">
        <h2 className="about_section_header">ABOUT THE LEATHER</h2>
        <p className="about_p">
          Wickett and Craig Vegetable Tanned Leather is a full grain leather and
          used for the majority of our goods due to its quality and durability.
        </p>
        <p className="about_p">
          Wickett and Craig leather is tanned in the USA and is among the
          highest quality veg-tanned leathers in the world. We use the two types
          of Wickett and Craig leather detailed below:
        </p>
        <div className="about_leather_types">
          <div className="about_leather_type">
            <h4 className="about_leather_header">English Bridle</h4>
            <h4 className="about_leather_subheader">Black, Chestnut</h4>
            <div className="about_leather_content">
              <div className="about_img_and_caption_wrapper">
                <img src={IMG1} alt="" className="about_leather_img" />
                <p className="img_caption">
                  {
                    "Wickett and Craig English Bridle in Medium Brown (not sold)"
                  }
                </p>
              </div>
              <p className="about_leather_text">
                <strong>English Bridle</strong> leather is a beautiful leather
                with a smooth matte surface finish. It has a flexible waxy
                temper and develops a beautiful patina over time.
              </p>
            </div>
          </div>
          <div className="about_leather_type">
            <h4 className="about_leather_header">Harness</h4>
            <h4 className="about_leather_subheader">Buck Brown</h4>
            <div className="about_leather_content">
              <div className="about_img_and_caption_wrapper">
                <img src={IMG2} alt="" className="about_leather_img" />
                <p className="img_caption">
                  Wickett and Craig Harness in Buck Brown
                </p>
              </div>
              <p className="about_leather_text">
                <strong>Harness</strong> leather has an even smoother feel than
                English bridle and a slight sheen on the surface. The leather
                shows its use and marks over time, which adds to its character
                and rugged look while still maintaining its natural beauty.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="about_section">
        <h2 className="about_section_header">ABOUT THE CREATOR</h2>
        <p className="about_p">
          My name is Isaac Brown, I am 16 years old and living in Fort Worth,
          Texas. I am striving to create simple, beautiful, high quality leather
          goods which will exceed expectations and last my customers a lifetime.
        </p>
        <img src={IMG3} alt="" className="about_creator_img" />
        <p className="about_p">
          I have always been fascinated by leathercraft. For years I imagined
          how amazing it would be to make my own wallet, or to give my dad a
          handmade leather belt. I loved the smell and feel of leather as well
          as the timeless nature of the craft itself. In 2020 I found the
          inspiration I needed to finally give it a try. I bought a cheap hide
          and a leather tool kit and began making wallets. I have been
          captivated ever since.
        </p>
        <p className="about_p">
          After a long process of experimenting and improving my designs, I
          reached the point where I was ready to start selling my work. I am
          always working to improve and expand my abilities in leathercraft. I
          am committed to offering my customers the highest quality goods, and I
          am excited to see where this craft takes me!
        </p>
        <div className="about_cta_btns">
          <Link to={"/products"} className="btn-def-black">
            SHOP PRODUCTS →
          </Link>
          <p>OR</p>
          <Link to={"/contact"} className="btn-def-white">
            CONTACT →
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
