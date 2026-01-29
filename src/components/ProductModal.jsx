import { forwardRef } from "react";

const ProductModal = forwardRef(
  (
    {
      isNew,
      tempPD,
      newImageUrl,
      handleTempPdChange,
      setNewImageUrl,
      addOtherImage,
      removeOtherImage,
      cancelSubmit,
      submitProduct,
      imageClassName = "",
    },
    modalElRef,
  ) => {
    return (
      <>
        <div
          id="productModal"
          className="modal fade"
          tabIndex="-1"
          aria-labelledby="productModalLabel"
          aria-hidden="true"
          ref={modalElRef}
        >
          <div className="modal-dialog modal-xl">
            <div className="modal-content border-0">
              <div className="modal-header bg-dark text-white">
                <h5 id="productModalLabel" className="modal-title">
                  {isNew ? <span>新增產品</span> : <span>編輯產品</span>}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={cancelSubmit}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-sm-4">
                    <div className="mb-2">
                      <div className="mb-3">
                        <label
                          htmlFor="imageUrl"
                          className="form-label fw-bold"
                        >
                          請輸入主要圖片網址
                        </label>
                        <input
                          id="imageUrl"
                          type="text"
                          className="form-control"
                          placeholder="請輸入主要圖片連結"
                          value={tempPD.imageUrl}
                          onChange={handleTempPdChange}
                        />
                      </div>
                      {tempPD.imageUrl && (
                        <img
                          className={`img-fluid ${imageClassName}`}
                          src={tempPD.imageUrl}
                          alt="主圖"
                        />
                      )}
                    </div>

                    <hr />
                    {/* 更多圖片區 */}
                    <div className="mb-3">
                      <label
                        htmlFor="otherImageUrl"
                        className="form-label fw-bold"
                      >
                        輸入其他圖片網址（最多 5 張）
                      </label>

                      <div className="input-group">
                        <input
                          id="otherImageUrl"
                          type="text"
                          className="form-control"
                          placeholder="請輸入其他圖片連結"
                          value={newImageUrl}
                          onChange={(e) => setNewImageUrl(e.target.value)}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          onClick={addOtherImage}
                          disabled={
                            (Array.isArray(tempPD.imagesUrl)
                              ? tempPD.imagesUrl.length
                              : 0) >= 5
                          }
                        >
                          新增
                        </button>
                      </div>
                    </div>

                    {/* 圖片清單 */}
                    <div className="row g-3">
                      {(Array.isArray(tempPD.imagesUrl)
                        ? tempPD.imagesUrl
                        : []
                      ).map((url, idx) => (
                        <div key={`${url}-${idx}`} className="col-6">
                          <div className="border rounded p-2">
                            <img
                              className={`img-fluid mb-2 ${imageClassName}`}
                              src={url}
                              alt={`更多圖片-${idx + 1}`}
                            />
                            <input
                              type="text"
                              className="form-control"
                              placeholder="請輸入圖片連結"
                              value={url}
                              readOnly
                            />
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm w-100"
                              onClick={() => removeOtherImage(idx)}
                            >
                              刪除這張
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="col-sm-8">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label fw-bold">
                        標題
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="form-control"
                        placeholder="請輸入標題"
                        value={tempPD.title}
                        onChange={handleTempPdChange}
                      />
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label
                          htmlFor="category"
                          className="form-label fw-bold"
                        >
                          分類
                        </label>
                        <input
                          id="category"
                          type="text"
                          className="form-control"
                          placeholder="請輸入分類"
                          value={tempPD.category}
                          onChange={handleTempPdChange}
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="unit" className="form-label fw-bold">
                          單位
                        </label>
                        <input
                          id="unit"
                          type="text"
                          className="form-control"
                          placeholder="請輸入單位"
                          value={tempPD.unit}
                          onChange={handleTempPdChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label
                          htmlFor="origin_price"
                          className="form-label fw-bold"
                        >
                          原價
                        </label>
                        <input
                          id="origin_price"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="請輸入原價"
                          value={tempPD.origin_price}
                          onChange={handleTempPdChange}
                        />
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="price" className="form-label fw-bold">
                          售價
                        </label>
                        <input
                          id="price"
                          type="number"
                          min="0"
                          className="form-control"
                          placeholder="請輸入售價"
                          value={tempPD.price}
                          onChange={handleTempPdChange}
                        />
                      </div>
                    </div>
                    <hr />

                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="form-label fw-bold"
                      >
                        產品描述
                      </label>
                      <textarea
                        id="description"
                        className="form-control"
                        placeholder="請輸入產品描述"
                        value={tempPD.description}
                        onChange={handleTempPdChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="content" className="form-label fw-bold">
                        說明內容
                      </label>
                      <textarea
                        id="content"
                        className="form-control"
                        placeholder="請輸入說明內容"
                        value={tempPD.content}
                        onChange={handleTempPdChange}
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <div className="form-check text-start">
                        <input
                          id="is_enabled"
                          className="form-check-input"
                          type="checkbox"
                          checked={!!tempPD.is_enabled}
                          onChange={handleTempPdChange}
                        />
                        <label
                          className="form-check-label fw-bold"
                          htmlFor="is_enabled"
                        >
                          是否啟用
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  // data-bs-dismiss="modal"
                  onClick={cancelSubmit}
                >
                  取消
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={submitProduct}
                >
                  確認
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  },
);

export default ProductModal;
