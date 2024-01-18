import api from "./api.js";

class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  showDetail(cat){
    // console.log(cat);
    // 상세 정보 요청
    api.fetchCatDetail(cat.cat.id).then(({data}) => {
      // 정보를 업데이트
      this.setState({
        visible: true,
        cat: data
      });
    });
  }

  CloseImageInfo(){
    console.log('닫기');
    this.setState({
      visible: false,
      cat: undefined
    });
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.cat;

      this.$imageInfo.innerHTML = `
        <div class="content-wrapper">
          <div class="title">
            <span>${name}</span>
            <div class="close">x</div>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="description">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </div>`;
      this.$imageInfo.style.display = "block";

      // this.$imageInfo.querySelector('.close').addEventListener
      // ('click', (e) =>{
      //   this.CloseImageInfo();
      // });
      //keypress, keydown, keyup 차이 리서치
      document.addEventListener('keydown', (e) => {
        // console.log(e.key);
        if(e.key === 'Escape'){
          this.CloseImageInfo();
        }
      });
      this.$imageInfo.addEventListener('click', (e) => {
        console.log(e.target.className);
        if(e.target.className === 'ImageInfo' || e.target.className === 'close'){
          this.CloseImageInfo();
        }
      });

    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}

export default ImageInfo;