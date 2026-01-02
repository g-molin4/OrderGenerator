import { useState,useEffect } from 'react';
import { createOrder, getExposures } from '../services/orderService';
import {formatCurrencyBR,parseCurrencyBR} from "../utils/currencyFormatter"
import { toast } from 'react-toastify';

export default function Dashboard() {
  const [ativo, setAtivo] = useState('PETR4');
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState('');
  const [lado, setLado] = useState('C');
  const [exposicoes, setExposicoes] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  const handleSubmit = async () => {
    try{
        const response =await createOrder({ ativo, preco, quantidade: Number(quantidade), lado });
        toast.success(response.data.mensagem || 'Ordem criada com sucesso');
    }
    catch(error){
        toast.error(
        error.response?.data?.erro || 'Erro ao criar ordem'
        );
    }
    await getExposicoes();
  };
  function handlePrecoChange(e) {
    const numericValue = parseCurrencyBR(e.target.value);
    setPreco(numericValue);
  }
  async function getExposicoes(){
    const res = await getExposures();
    setExposicoes(res.data);
  }
  useEffect(() => {
    getExposicoes();
  }, []);

  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-600">
        Base Flowa 🚀
        </h1>
      <div className="bg-white p-6 rounded shadow w-96 space-y-4">
        <h1 className="text-xl font-bold">Order Generator</h1>

        <select
          className="border p-2 w-full"
          value={ativo}
          onChange={e => setAtivo(e.target.value)}
        >
          <option disabled>Selecione o ativo</option>
          <option value="PETR4">PETR4</option>
          <option value="VALE3">VALE3</option>
          <option value="VIIA4">VIIA4</option>
        </select>


         <input
          className="border p-2 w-full"
          placeholder="Preço"
          type="text"
          value={formatCurrencyBR(preco)}
          onChange={handlePrecoChange}
        />

        <input
          className="border p-2 w-full"
          placeholder="Quantidade"
          type="number"
          value={quantidade}
          onChange={e => setQuantidade(e.target.value)}
        />

        <select
          className="border p-2 w-full"
          value={lado}
          onChange={e => setLado(e.target.value)}
        >
          <option disabled>Selecione</option>
          <option value="C">Compra</option>
          <option value="V">Venda</option>
        </select>

        <button
          className="bg-blue-600 text-white p-2 w-full rounded hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Enviar Ordem
        </button>

        <div>
          <h2 className="font-semibold mb-2">
            Exposição por Ativo
          </h2>

          {exposicoes.length === 0 && (
            <p className="text-gray-500 text-sm">
              Nenhum dado disponível
            </p>
          )}

          <ul className="space-y-2">
            {exposicoes.map((item) => (
              <li
                key={item.ativo}
                className="flex justify-between items-center border p-3 rounded"
              >
                <span className="font-medium">
                  {item.ativo}
                </span>

                <span
                  className={`font-semibold ${
                    item.exposicao >= 0
                      ? "text-blue-600"
                      : "text-red-600"
                  }`}
                >
                  {formatCurrencyBR(item.exposicao)}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}