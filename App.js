import BreadCrumb from "./Nav.js";
import Nodes from "./Nodes.js";
import Modal from "./Modal.js";
import Loading from "./Loading.js";

export default function App({ $target }) {
  const DIR = "DIRECTORY";
  const FILE = "FILE";
  console.log($target);

  this.state = {
    dirs: ["root"],
    pageId: -1,
    nodeList: [
      {
        id: "5",
        name: "2021/04",
        type: "DIRECTORY",
        filePath: null,
        parent: {
          id: "1",
        },
      },
      {
        id: "19",
        name: "물 마시는 사진",
        type: "FILE",
        filePath: "/images/a2i.jpg",
        parent: {
          id: "1",
        },
      },
    ],
    modalOn: false,
    selectedFilePath: -1,
  };

  // const goBack = () => {

  // }

  // 컴포넌트 생성
  const nav = new BreadCrumb({
    $target,
    initialState: { dirs: this.state.dirs },
  });
  const nodes = new Nodes({
    $target,
    initialState: {
      nodeList: this.state.nodeList,
      isRoot: this.state.dirs.length <= 1,
    },
    onClick: (node) => {
      const { dirs } = this.state;
      if (node.type === DIR) {
        console.log("라우트 처리");
        dirs.push(node.name);
        this.setState({ dirs });
      } else {
        console.log("사진 모달 처리");
        this.setState({ modalOn: true });
        this.setState({ selectedFilePath: node.filePath });
      }
    },
    goBack: () => {
      const { dirs } = this.state;
      dirs.pop();
      this.setState({ dirs });
    },
  });

  //
  const modal = new Modal({
    $target,
    initialState: {
      display: false,
      selectedFilePath: "",
    },
  });
  //  const loading = new Loading({$target});

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    console.log(this.state.dirs);
    nav.setState({ dirs: this.state.dirs });
    console.log(this.state.dirs.length <= 1);
    nodes.setState({
      nodeList: this.state.nodeList,
      isRoot: this.state.dirs.length <= 1,
    });
    modal.setState({
      display: this.state.modalOn,
      selectedFilePath: this.state.selectedFilePath,
    });
  };
}
