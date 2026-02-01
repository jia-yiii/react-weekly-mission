import { NavLink } from "react-router-dom";
import W5Navbar from "@/components/W5Navbar";
import style from "@/pages/Week5/week5.module.css";

function Week5() {
  return (
    <>
      <W5Navbar />
      <div>
        <div
          id="apple"
          className="carousel slide"
          data-bs-ride="carousel"
          data-bs-interval="3000"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#apple"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#apple"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#apple"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src="https://images.unsplash.com/photo-1621857426350-ddab819cf0cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FrZSUyMHNob3B8ZW58MHx8MHx8fDA%3D"
                className={`d-block w-100 ${style.carouselPhoto}`}
              />
              <div className={style.carouselOverlay} />

              {/* 文字區 */}
              <div className={`carousel-caption ${style.carouselCaption}`}>
                <h1 className={`fw-bold mb-2 ${style.carouselText}`}>
                  糖嶼 Sugar Island
                </h1>
                <p className={`mb-5 fw-bold ${style.carouselText}`}>
                  登陸糖嶼，暫停一下現實
                </p>

                <NavLink
                  to="/sugarIsland/pdlist"
                  className="btn btn-light rounded-pill px-4"
                >
                  進入糖嶼
                </NavLink>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1648808692677-017af08104d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzB8fGNha2UlMjBjYWZlfGVufDB8fDB8fHww"
                className={`d-block w-100 ${style.carouselPhoto}`}
              />
              {/* 文字區 */}
              <div className={`carousel-caption ${style.carouselCaption}`}>
                <h1 className={`fw-bold mb-2 ${style.carouselText}`}>
                  糖嶼 Sugar Island
                </h1>
                <p className={`mb-5 fw-bold ${style.carouselText}`}>
                  在甜點的島嶼上，慢慢生活
                </p>

                <NavLink
                  to="/sugarIsland/pdlist"
                  className="btn btn-light rounded-pill px-4"
                >
                  進入糖嶼
                </NavLink>
              </div>
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1701086553413-28c7d408a86f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fGNha2UlMjBjYWZlfGVufDB8fDB8fHww"
                className={`d-block w-100 ${style.carouselPhoto}`}
              />
              {/* 文字區 */}
              <div className={`carousel-caption ${style.carouselCaption}`}>
                <h1 className={`fw-bold mb-2 ${style.carouselText}`}>
                  糖嶼 Sugar Island
                </h1>
                <p className={`mb-5 fw-bold ${style.carouselText}`}>
                  讓生活，甜一點點就好
                </p>

                <NavLink
                  to="/sugarIsland/pdlist"
                  className="btn btn-light rounded-pill px-4"
                >
                  進入糖嶼
                </NavLink>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#apple"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#apple"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default Week5;
