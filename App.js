import BreadCrumb from "./Nav.js";
import Nodes from "./Nodes.js";
import Modal from "./Modal.js";
import Loading from "./Loading.js";
import { getData } from "./api.js";
import { disableAllActions, preventAction } from "./utils.js";

export default function App({ $target }) {
  const DIR = "DIRECTORY";
  const FILE = "FILE";
  this.state = {
    dirs: ["root"],
    pageId: -1,
    nodeList: [],
    display: false,
    selectedFilePath: -1,
    cache: {},
  };

  const renewData = async (id) => {
    loading.setState({ display: true });
    disableAllActions("click", true);
    await processCache(id);
    loading.setState({ display: false });
    disableAllActions("click", false);
  };

  // 캐시 처리
  const processCache = async (id) => {
    const { dirs, nodeList, cache } = this.state;
    const key = dirs.length > 0 ? dirs[dirs.length - 1] : null;
    let cached = cache[key];
    if (!cached) {
      cached = await getData(id);
      cache[key] = cached;
    }
    this.setState({ nodeList: cached });
  };

  // 컴포넌트 생성
  const nav = new BreadCrumb({
    $target,
    initialState: { dirs: this.state.dirs },
    onClick: (dir) => {
      const { dirs } = this.state;
      const index = dirs.indexOf(dir);
      if (index !== dirs.length - 1) {
        this.setState({ dirs: dirs.slice(0, index + 1) });
        renewData();
      }
    },
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
        dirs.push(node.name);
        this.setState({ dirs });
        renewData(node.id);
      } else {
        this.setState({ display: true });
        this.setState({ selectedFilePath: node.filePath });
      }
    },
    goBack: () => {
      const { dirs } = this.state;
      dirs.pop();
      this.setState({ dirs });
      renewData();
    },
  });

  //
  const modal = new Modal({
    $target,
    initialState: {
      display: false,
      selectedFilePath: "",
    },
    onClose: () => {
      this.setState({ display: false });
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
    nav.setState({ dirs: this.state.dirs });
    nodes.setState({
      nodeList: this.state.nodeList,
      isRoot: this.state.dirs.length <= 1,
    });
    modal.setState({
      display: this.state.display,
      selectedFilePath: this.state.selectedFilePath,
    });
  };
  renewData();
}
