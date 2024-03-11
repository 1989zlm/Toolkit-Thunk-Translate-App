import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/actions/translateAction";
import Select from "react-select";
import Loader from "./components/Loader";
import { updateText } from "./redux/slices/translateSlice";

const App = () => {
  //stora abone oluyoruuz
  const langState = useSelector((store) => store.language);
  //translateSlice initialstatei tanımladıktan sonra buuraya gelip stora abone olduk ve translateState dedik.
  const translateState = useSelector((store) => store.translate);

  // console.log(translateState);
  //burada selectte seçtiğğimiz verileri statte tutmak istiyoruz.
  const [sourceLang, setSourceLang] = useState({
    value: "tr",
    label: "Turkish",
  }); //kaynak dil
  const [targetLang, setTargetLang] = useState({
    value: "en",
    label: "English",
  }); //hedef dil

  const [text, setText] = useState();

  //reducera haber veriyoruz.
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  //daha kullanışlı bir select için react selecten bitande import ettik ve consolda görünen dil isin ve değerlerini import ettiğimiz selectin value ve labeli olarak yazmamız lazım bunuda map ile yaptık formatted olarak tanımladık
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // diziyi formatlama işleminin her render sırasında olmasını istemediğimiz için useMemo kullanarak cache'e gönderdik.
  const formatted = useMemo(
    () =>
      langState.languages.map((i) => ({
        value: i.code,
        label: i.name,
      })),
    [langState.languages] // bağımlılık dizini doldurduk çünkü usememo boş diziyi hafızaya atıyor ve bize boş dizi döndürüyor.
  );

  // console.log(langState.languages);//!burada boş dizi görünüyor önce use memoya bağımlılık dizinisi doldurmazsak bize hep bu boş diziyi getirir.
  // console.log(formatted);
  // console.log(sourceLang);
  // console.log(targetLang);

  //Değişme fonksiyonu
  const handleChange = () => {
    //select alanlarındaki değerleri değiştir
    setSourceLang(targetLang);
    setTargetLang(sourceLang);

    // text alanlarındaki değerleri değiştir
    setText(translateState.text); //stateteki text değerini güncelle.

    //slice taki text değerini güncelle
    dispatch(updateText(text));
  };

  return (
    <div className=" bg-zinc-900 h-screen text-white grid place-items-center">
      <div className="w-[80vw] max-w-[1100px] flex flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold mb-7">Çeviri + </h1>
        {/* üst alan */}
        <div className="flex gap-2 text-black">
          <Select
            isLoading={langState.isLoading}
            value={sourceLang}
            isDisabled={langState.isLoading}
            onChange={setSourceLang}
            className="flex-1"
            options={formatted}
          />
          {/* {langState.languages.map((i) => (
              <option>{i.code}</option>
            ))} buunu import edilen select ile değiştirdik*/}

          <button
            onClick={handleChange}
            className="rounded py-2 px-6 bg-zinc-700 text-white transition hover:ring-2 hover:bg-zinc-800"
          >
            Değiş
          </button>
          <Select
            isLoading={langState.isLoading}
            value={targetLang}
            isDisabled={langState.isLoading}
            onChange={setTargetLang}
            className="flex-1"
            options={formatted}
          />
        </div>

        {/* text alanları */}
        <div className="flex mt-5 gap-[105px] max-md:flex-col max-md:gap-3">
          <div className="flex-1">
            <textarea
              value={text} //bu değeri yazı alanlarını usestate tuttuğumuzve statette değişiklik olcağı için settext yardımıyla state güncelledik.yazıların yer değiştirmesi için gerekli olan fonk. için yazdık
              onChange={(e) => setText(e.target.value)}
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black"
            />
          </div>
          <div className="relative flex-1">
            <textarea
              value={translateState.text}
              disabled
              className="w-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded"
            />
            {translateState.isLoading && <Loader />}
          </div>
        </div>

        {/* buton */}
        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
          className=" rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-700 mt-3 hover:ring-2 hover:bg-zinc-900 transition"
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
