import BreadCrumb from "./Nav.js";
import Nodes from "./Nodes.js";
import Modal from "./Modal.js";
import Loading from "./Loading.js";
import { getData } from "./api.js";

export default function App({ $target }) {
  const DIR = "DIRECTORY";
  this.state = {
    dirList: [
      {
        label: "root",
        id: "root",
      },
    ],
    nodeList: [],
    imgModalOn: false,
    selectedFilePath: "",
    cache: {},
  };

  const renewData = async (id) => {
    loading.setState({ display: true });
    await processCache(id);
    loading.setState({ display: false });
  };

  // 캐시 처리
  const processCache = async (id) => {
    const { dirList, nodeList, cache } = this.state;
    let cached = cache[id];
    if (!cached) {
      cached = await getData(id === "root" ? null : id);
      cache[id] = cached;
    }
    this.setState({ nodeList: cached });
  };

  // 컴포넌트 생성
  const nav = new BreadCrumb({
    $target,
    initialState: { dirList: this.state.dirList },
    onClick: async ({ id, label }) => {
      // 리팩토링
      const { dirList } = this.state;
      let foundIndex = -1;
      dirList.forEach((e, index) => {
        if (e.id === id) {
          foundIndex = index;
          return true;
        }
      });
      await renewData(id);
      if (foundIndex !== -1 && foundIndex !== dirList.length - 1) {
        this.setState({ dirList: dirList.slice(0, foundIndex + 1) });
      }
    },
  });
  const nodes = new Nodes({
    $target,
    initialState: {
      nodeList: this.state.nodeList,
      isRoot: this.state.dirList.length <= 1,
    },
    onClick: async (node) => {
      const { dirList } = this.state;
      if (node.type === DIR) {
        await renewData(node.id);
        this.setState({
          dirList: dirList.concat({
            label: node.name,
            id: node.id,
          }),
        });
      } else {
        this.setState({
          imgModalOn: true,
          selectedFilePath: node.filePath,
        });
      }
    },
    goBack: () => {
      const { dirList } = this.state;
      dirList.pop();
      this.setState({ dirList });
      renewData(dirList[dirList.length - 1].id);
    },
  });

  const modal = new Modal({
    $target,
    initialState: {
      imgModalOn: false,
      selectedFilePath: "",
    },
    onClose: () => {
      this.setState({ imgModalOn: false });
    },
  });
  const loading = new Loading({
    $target,
    initialState: {
      display: true,
    },
  });

  this.setState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState,
    };
    nodes.setState({
      nodeList: this.state.nodeList,
      isRoot: this.state.dirList.length <= 1,
    });
    nav.setState({ dirList: this.state.dirList });
    modal.setState({
      imgModalOn: this.state.imgModalOn,
      selectedFilePath: this.state.selectedFilePath,
    });
  };
  renewData("root");
}
