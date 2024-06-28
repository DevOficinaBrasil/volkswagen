import { IMaskInput } from "react-imask";

export default function MaskedInput({ mask, ...other }) {
    return (
      <IMaskInput
        mask={mask}
        definitions={{
          '#': /[1-9]/,  // Define máscaras com símbolos personalizados se necessário
        }}
        unmask={true}  // Determina se o valor inclui a máscara ou apenas caracteres visíveis
        {...other}  // Permite todas as outras props
        overwrite  // Permite sobrescrever enquanto digita
      />
    );
  }