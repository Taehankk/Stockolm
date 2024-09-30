import { useEffect, useRef, useState } from "react";
import landingChart from "../../assets/LANDING01.svg"; // 절대 경로로 설정
import landingAnalyst from "../../assets/LANDING02.svg"; // 절대 경로로 설정
import landingCommunity from "../../assets/LANDING03.svg"; // 절대 경로로 설정
import Header from "../../components/common/Header";
import "./index.css";
import Footer from "../../components/common/Footer";

const LandingPage = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      const deltaY = e.deltaY;
      const currentIndex = sectionsRef.current.findIndex(
        (section) => section && section.getBoundingClientRect().top >= 0
      );

      if (currentIndex === 0 && deltaY < 0) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (currentIndex === 4 && deltaY > 0) {
        return;
      }

      if (deltaY > 0 && currentIndex < sectionsRef.current.length - 1) {
        const nextSection = sectionsRef.current[currentIndex + 1];
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: "smooth" });
        }
        // sectionsRef.current[currentIndex + 1].scrollIntoView({
        //   behavior: "smooth",
        // });
      } else if (deltaY < 0 && currentIndex > 0) {
        if (currentIndex === 1) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          const prevSection = sectionsRef.current[currentIndex - 1];
          if (prevSection) {
            prevSection.scrollIntoView({ behavior: "smooth" });
          }
          // sectionsRef.current[currentIndex - 1].scrollIntoView({
          //   behavior: "smooth",
          // });
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (sectionsRef.current) {
        sectionsRef.current.forEach((section) => {
          if (section) {
            observer.unobserve(section);
          }
        });
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowTopButton(true);
    } else {
      setShowTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="landing-page">
      <main className="main-content">
        <section
          className="headersection"
          ref={(el) => (sectionsRef.current[0] = el!)}
        >
          <header className="header-content w-[90vw] mx-auto border-b border-b-[#B4B4B4] border-opacity-20">
            <Header></Header>
          </header>
        </section>

        <section
          ref={(el) => (sectionsRef.current[1] = el!)}
          className="section section1"
        >
          <div className="content flex gap-32 w-[80vw] justify-center p-20 relative">
            <div className="landing-image-box">
              <img src={landingChart} alt="차트" className="landing-image" />
            </div>
            <div className="-z-10 w-2/3 h-[200px] top-[180px] right-0 rotate-45 bg-[#FDF8E7] absolute rounded-full"></div>
            <div className="z-10 flex flex-col justify-center gap-5">
              <div>
                <p className="text-4xl text-start text-TextRed whitespace-nowrap">
                  01. 실시간 차트 확인
                </p>
              </div>
              <div>
                <p className="text-start text-2xl whitespace-nowrap">
                  애널리스트 분석 결과를
                </p>
                <p className="text-start text-2xl whitespace-nowrap">
                  실시간 차트와 함께 확인하세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[2] = el!)}
          className="section section2"
        >
          <div className="content flex gap-32 w-[80vw] justify-center p-20 relative">
            <div className="-z-10 w-2/3 h-[200px] top-[170px] right-120 rotate-45 bg-[#E6EDF6] absolute rounded-full"></div>
            <div className="flex flex-col justify-center gap-5">
              <div>
                <p className="text-4xl text-start text-TextRed whitespace-nowrap">
                  02. 애널리스트 정보 확인
                </p>
              </div>
              <div>
                <p className="text-start text-2xl whitespace-nowrap">
                  신뢰성 있는 애널리스트의 정보를 통해
                </p>
                <p className="text-start text-2xl whitespace-nowrap">
                  안전한 투자가 가능해요.
                </p>
              </div>
            </div>
            <div className="landing-image-box">
              <img
                src={landingAnalyst}
                alt="애널리스트 이미지"
                className="landing-image"
              />
            </div>
          </div>
        </section>

        <section
          ref={(el) => (sectionsRef.current[3] = el!)}
          className="section section3"
        >
          <div className="content flex gap-32 w-[80vw] justify-center p-20 relative">
            <div className="-z-10 w-2/3 h-[200px] top-[170px] right-0 rotate-45 bg-red-100 absolute rounded-full"></div>
            <div className="landing-image-box">
              <img
                src={landingCommunity}
                alt="커뮤니티 이미지"
                className="landing-image"
              />
            </div>
            <div className="flex flex-col justify-center gap-5">
              <div>
                <p className="text-4xl text-start text-TextRed">03. 커뮤니티</p>
              </div>
              <div>
                <p className="text-start text-2xl whitespace-nowrap">
                  다양한 투자자들과 소통하며
                </p>
                <p className="text-start text-2xl whitespace-nowrap">
                  건강한 투자 생활을 함께해요.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          className="footersection"
          ref={(el) => (sectionsRef.current[4] = el!)}
        >
          <footer className="footer m-auto w-[90vw] border-slate-200 border-t-2">
            <Footer></Footer>
          </footer>
        </section>
      </main>

      {showTopButton && (
        <button onClick={scrollToTop} className="top-button">
          ▲ 최상단으로
        </button>
      )}
    </div>
  );
};

export default LandingPage;
