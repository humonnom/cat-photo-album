export default function Nodes({ $target }) {
    this.$element = document.createElement('div');
    this.$element.className = 'Nodes';
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



    //  <div class="Nodes">
    //  <div class="Node">
    //    <img src="./assets/prev.png">
    //  </div>
    //  <div class="Node">
    //    <img src="./assets/directory.png">
    //    <div>2021/04</div>
    //  </div>
    //  <div class="Node">
    //    <img src="./assets/file.png">
    //    <div>하품하는 사진</div>
    //  </div>
    //  </div>