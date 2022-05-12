
export default function App({ $target }) {
    console.log($target);

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