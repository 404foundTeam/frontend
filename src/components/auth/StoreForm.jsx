import styles from "../../styles/auth/StoreForm.module.css";
import FormLayout from "./FormLayout";
import FormLine from "./FormLine";
import FormTitle from "./FormTitle";
import SignInput from "./SignInput";

function StoreForm() {
  return (
    <FormLayout>
      <FormTitle label="업장 정보" isShow={true} />
      <SignInput label="업장명" type="text" />
      <FormLine />
      <SignInput label="사업자등록번호" type="text" />
      <FormLine />
      <SignInput label="이름" type="text" />
    </FormLayout>
  );
}

export default StoreForm;
