

export default function Loading({ $target }) {
    this.$element = document.createElement('div');
    this.$element.className = 'Modal Loading';
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
    this.render();

}
// <!--
// <div class="Modal Loading">
//   <div class="content">
//     <img src="./assets/nyan-cat.gif">
//   </div>
// </div>