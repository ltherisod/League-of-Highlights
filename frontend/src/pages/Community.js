import Header from "../components/Header";
import Footer from "../components/Footer";
import "./Community.css";

const Community = () => {
  return (
    <>
      <Header />
      <div className="imageAndText">
        <h1>Community</h1>
      </div>
      <h2 className='text-center'>COSPLAY AND FAN ART</h2>
      <section>
      <p>
        The community submitted over 4,000 entries to the Season 2021 Fan Art
        Contest and we have spent the past week combing through every one in awe
        of your collective talent. We’ve been blown away by your passion,
        creativity, and deep appreciation for all things League. Narrowing this
        massive field of entries down to just a handful of finalists was tough,
        really tough, but we're excited to present the Season 2021 Fan Art
        Contest grand prize winners, who will be taking home a brand-new iPad
        Pro, an Apple Pencil, and 3250 RP! Honorable mentions will also be
        receiving 3250 RP.
      </p>
      <p>
        This year we had over 60 submissions from Cosplayers across NA, all
        competing to win the grand prize of $5,000 and a round trip ticket for
        them and a friend to Worlds. Additionally, 2nd place will receive
        $2,000, with 3rd place being awarded $1,000. You as an audience will
        also get to vote, on social media, for your fan favorite, who will win
        an additional $500.
      </p>
      <p>
        During LCS Finals, these amazing cosplayers will be judged by our panel
        of experienced cosplay judges. Thank you to judges Stella Chuu, Kinpatsu
        Cosplay, and last year's winner Johnny Junkers for working with us on
        this project.
      </p>
      </section>
      
      <div className="photos">
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/L8Pw82PW/2021-2-15-Pirate-Invicta.jpg")`,
          }}
          className="photo"
        ></div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/XYX3mcdk/ploop4.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/c4BT9CQ0/2021-2-15-Laurits-Rask.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/TYB2s2GN/2021-2-15-Little-Legends.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/j2HVkThm/2021-2-15-Nasus-Kim.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/gcHLZZVy/ploop5.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/9MJVWC99/ploop3.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/RhkYmDgf/ploop2.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/hGvN9TQX/ploop1.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/0Qyc1fnn/hk3drryu9wnicc44unma.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/65BpfYrj/2021-2-15-John-Crazzy.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
        <div
          style={{
            backgroundImage: `url("https://i.postimg.cc/hGLKwT42/OIP.jpg")`,
          }}
          className="photo"
        >
          ''
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Community;
