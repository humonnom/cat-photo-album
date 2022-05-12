export default function Modal({ $target }) {
    this.$element = document.createElement('div');
    this.$element.className = 'Modal ImageViewer';
    $target.appendChild(this.$element);
    this.state = {  

    };

    // 컴포넌트 생성
    




    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        }
    }

    this.render = () => {
        
    }

}
{/* <div class="Modal ImageViewer">
<div class="content">
  <img src="./assets/sample_image.jpg">
</div> */}