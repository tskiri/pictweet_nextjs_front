'use client';
import { useForm } from 'react-hook-form';
import { useAuthContext } from '@/app/context/AuthContext';


interface CommentForm {
  text: string;
}

interface CommentFormProps {
  errorMessages: string[];
  onSubmit: (data: CommentForm) => void;
}

const CommentForm = ({ errorMessages, onSubmit }: CommentFormProps) => {
  // reset：react-hook-formのメソッドの１つ。入力値をリセットできる。今回はコメントを投稿したらフォームの内容を空にするようにした。
  const { register, handleSubmit, formState: { errors }, reset } = useForm<CommentForm>();
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <>
      {user && user.isAuthenticated ? (
        <div>
          <form onSubmit={handleSubmit((data: CommentForm)=>{onSubmit(data); reset();})}>
            {errorMessages.map((error, index) => (
              <div key={index} className="error-message">{error}</div>
            ))}
            {errors.text && <span className="error-message">{errors.text.message}</span>}
            <textarea
              {...register('text', { required: "コメントは必須です" })}
              placeholder="コメントする"
              rows={2}
            />
            <input type="submit" value="SEND" />
          </form>
        </div>
      ) : (
        <strong>
          <p>※※※ コメントの投稿には新規登録/ログインが必要です ※※※</p>
        </strong>
      )}
    </>
  );
};

export default CommentForm;