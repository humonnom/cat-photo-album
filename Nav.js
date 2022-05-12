export default function BreadCrumb({ $target }) {
    this.$element = document.createElement('nav');
    this.$element.className = 'BreadCrumb';
    $target.appendChild(this.$element);

    // console.log($target);

    this.state = {

    };

    this.setState = (nextState) => {
        this.state = {
            ...this.state,
            ...nextState,
        }
    }

    this.render = () => {
        
    }
}


// <nav class="Breadcrumb">
//         <div>root</div>
//         <div>노란고양이</div>
//       </nav>