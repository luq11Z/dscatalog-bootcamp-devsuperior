import { ReactComponent as UploadPlaceholder } from 'assets/images/upload-placeholder.svg';
import { useState } from 'react';
import { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { requestBackend } from 'util/requests';
import { useParams } from 'react-router-dom';

import './styles.scss';

type Props = {
  onUploadSuccess: (imgUrl: string) => void;
  productImgUrl: string;
};

type UrlParams = {
  productId: string;
};

const ImageUpload = ({ onUploadSuccess, productImgUrl }: Props) => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const imgUrl = uploadedImgUrl || productImgUrl;
  const { productId } = useParams<UrlParams>();
  const isEditing = productId !== 'create';

  const onUploadProgress = (progressEvent: ProgressEvent) => {
    const progress = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total!
    );
    setUploadProgress(progress);
  };

  const uploadImage = (selectedImage: File) => {
    const data = new FormData();
    data.append('file', selectedImage);

    const config: AxiosRequestConfig = {
      url: '/products/image',
      method: 'POST',
      data,
      withCredentials: true,
      onUploadProgress
    };

    requestBackend(config)
      .then((response) => {
        setUploadedImgUrl(response.data.uri);
        onUploadSuccess(response.data.uri);
      })
      .catch(() => {
        toast.error('Erro ao enviar arquivo!');
      })
      .finally(() => {
        setUploadProgress(0);
      });
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0];

    if (selectedImage) {
      uploadImage(selectedImage);
    }
  };

  return (
    <div className="row image-upload-container">
      <div className="col-6">
        <div className="upload-button-container">
          <input
            type="file"
            id="upload"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            hidden
          />
          <label htmlFor="upload">{isEditing ? 'ALTERAR IMAGEM' : 'ADICIONAR IMAGEM'}</label>
        </div>
        <small className="upload-text-helper text-primary">
          As imagens devem ser JPG ou PNG e não devem ultrapassar{' '}
          <strong>5 mb.</strong>
        </small>
      </div>

      <div className="col-6 upload-placeholder">
        {uploadProgress > 0 && (
          <>
            <UploadPlaceholder />
            <div className="upload-progress-container">
              <div
                className="upload-progress"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </>
        )}

        {imgUrl && uploadProgress === 0 && (
          <img src={imgUrl} alt={imgUrl} className="uploaded-image" />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
