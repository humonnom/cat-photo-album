const END_POINT =
  "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev/";

const fetchData = async (url) => {
  try {
    const res = await fetch(url);
    if (res && res.ok) {
      return await res.json();
    }
  } catch (error) {
    alert(`서버통신 에러 (${error})/ 잠시후 다시 시도해주세요.`);
  }
};

export const getData = async (id) => {
  return fetchData(`${END_POINT}${id ? id : ""}`);
};
