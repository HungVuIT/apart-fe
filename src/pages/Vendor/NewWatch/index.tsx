import React, { useRef, useState } from 'react';
import Container from '../../../components/Container';
import classes from './new-watch.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './customMui.scss';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { addNewProduct } from '../../../api/service/product-service';

interface IDataNewWatch {
  createdAt: string
  updatedAt: string
  name: string
  description: string
  content: string
  quantity: number
  saled: number
  price: number
  gender: string
  materialCord: string
  glassSurface: string
  glassSize: string
  brand: string
  madeBy: string
  other: string
  warranty: string
  status: string
  weight: number
  height: number
  width: number
  length: number
}
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  price: yup.number().required('Vui lòng nhập đơn giá'),
  quantity: yup.number().required('Vui lòng nhập số lượng sản phẩm'),
  content: yup.string().required('Vui lòng nhập mô tả ngắn'),
  description: yup.string().required('Vui lòng nhập mô tả chi tiết')
});
function NewWatch() {
  const { register, setValue, control, handleSubmit, clearErrors, formState: { errors } } = useForm<IDataNewWatch>({
    resolver: yupResolver(schema)
  });
  const [lstImg, setLstImg] = useState<any[]>([null, null, null, null, null, null]);
  const [lstFile, setLstFile] = useState<any[]>([null, null, null, null, null, null]);
  const refList = {
    ref1: useRef<HTMLInputElement>(null),
    ref2: useRef<HTMLInputElement>(null),
    ref3: useRef<HTMLInputElement>(null),
    ref4: useRef<HTMLInputElement>(null),
    ref5: useRef<HTMLInputElement>(null),
    ref6: useRef<HTMLInputElement>(null)
  };
  const navigate = useNavigate();
  const handleImageUpload = (e: any, index: number) => {
    console.log('asdasd');
    const selectedFile = e.target.files[0]; // Lấy file đầu tiên được chọn
    const imageUrl = URL.createObjectURL(selectedFile); // Tạo đường dẫn URL cho file ảnh
    const files = [...lstFile];
    const imgs = [...lstImg];
    files[index] = selectedFile;
    imgs[index] = imageUrl;
    console.log(files, imgs);
    setLstFile(files);
    setLstImg(imgs);
  };
  const handleClickUpload = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
      ref.current.click();
    }
  };
  const handeChangeGender = (event: SelectChangeEvent) => {
    const selectedGender = event.target.value;
    setValue('gender', selectedGender);
  };
  const onSubmit: SubmitHandler<IDataNewWatch> = async (_data: IDataNewWatch) => {
    const newLstFile = lstFile.filter(file => !!file);
    const params = new FormData();
    Object.entries(_data).forEach(([key, value]) => {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`${key}: ${value}`);
    });
    // const params: FormData = {
    //   ..._data
    // };
    // const res = await addNewProduct(params);
    // if (res.success) {
    //   toast.success('Thêm sản phẩm thành công');
    //   navigate('/shop/manager/watch');
    // } else {
    //   toast.error('Thêm sản phẩm không thành công');
    // }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.wrapper + ' new-watch'}>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin cơ bản</div>
          <div className={classes.item}>
            <div className={classes['item-title']}>Hình ảnh sản phẩm:</div>
            <div className={classes['item-content'] + ' ' + classes['img-group']}>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref1)}>
                {!!lstImg[0] && <img src={lstImg[0]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 0)}
                  ref={refList.ref1}
                  style={{ display: 'none' }}
                />
                {!lstImg[0] && <AddIcon className={classes['img-icon']}/>}
              </div>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref2)}>
                {!!lstImg[1] && <img src={lstImg[1]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 1)}
                  ref={refList.ref2}
                  style={{ display: 'none' }}
                />
                {!lstImg[1] && <AddIcon className={classes['img-icon']}/>}
              </div>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref3)}>
                {!!lstImg[2] && <img src={lstImg[2]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 2)}
                  ref={refList.ref3}
                  style={{ display: 'none' }}
                />
                {!lstImg[2] && <AddIcon className={classes['img-icon']}/>}
              </div>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref4)}>
                {!!lstImg[3] && <img src={lstImg[3]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 3)}
                  ref={refList.ref4}
                  style={{ display: 'none' }}
                />
                {!lstImg[3] && <AddIcon className={classes['img-icon']}/>}
              </div>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref5)}>
                {!!lstImg[4] && <img src={lstImg[4]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 4)}
                  ref={refList.ref5}
                  style={{ display: 'none' }}
                />
                {!lstImg[4] && <AddIcon className={classes['img-icon']}/>}
              </div>
              <div className={classes['item-img']} onClick={() => handleClickUpload(refList.ref6)}>
                {!!lstImg[5] && <img src={lstImg[5]} alt='Avatar' className={classes['img-avt']}/>}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 5)}
                  ref={refList.ref6}
                  style={{ display: 'none' }}
                />
                {!lstImg[5] && <AddIcon className={classes['img-icon']}/>}
              </div>
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes['item-title']}>*Tên sản phẩm</div>
            <div className={classes['item-content']}>
              <Controller name='name' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('name')}
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.name}
                    helperText={errors.name?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes['item-title']}>*Đơn giá</div>
            <div className={classes['item-content']}>
              <Controller name='price' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('price')}
                    type='number'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.price}
                    helperText={errors.price?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item}>
            <div className={classes['item-title']}>*Số lượng</div>
            <div className={classes['item-content']}>
              <Controller name='quantity' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('quantity')}
                    type='number'
                    onBlur={onBlur}
                    onChange={onChange}
                    error={!!errors.quantity}
                    helperText={errors.quantity?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item + ' ' + classes.mutil}>
            <div className={classes['item-title']}>*Nội dung</div>
            <div className={classes['item-content']}>
              <Controller name='content' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('content')}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Nhập nội dung mô tả ngắn về sản phẩm'
                    multiline
                    rows={6}
                    error={!!errors.content}
                    helperText={errors.content?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>
          <div className={classes.item + ' ' + classes.mutil}>
            <div className={classes['item-title']}>*Mô tả sản phẩm</div>
            <div className={classes['item-content']}>
              <Controller name='description' control={control}
                render={({
                  field: { onChange, onBlur, value, name, ref },
                  fieldState: { invalid, isTouched, isDirty, error },
                  formState
                }) => (
                  <TextField
                    variant='outlined'
                    {...register('description')}
                    onBlur={onBlur}
                    onChange={onChange}
                    placeholder='Nhập mô tả chi tiết về sản phẩm'
                    multiline
                    rows={6}
                    error={!!errors.description}
                    helperText={errors.description?.message}
                    className={classes.input}
                  />
                )}
              />
            </div>
          </div>

        </>
      </Container>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin chi tiết</div>
          <div className={classes.group + ' group'}>
            <div className={classes.groupLeft}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Thương hiệu</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='brand' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('brand')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.brand}
                        helperText={errors.brand?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Chất liệu dây đeo</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='materialCord' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('materialCord')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.materialCord}
                        helperText={errors.materialCord?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Đường kính</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='glassSize' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('glassSize')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.glassSize}
                        helperText={errors.glassSize?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Xuất xứ</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='madeBy' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('madeBy')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.madeBy}
                        helperText={errors.madeBy?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={classes.groupRight}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Hạn bảo hành</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='warranty' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('warranty')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.warranty}
                        helperText={errors.warranty?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Bề mặt</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='glassSurface' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('glassSurface')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.glassSurface}
                        helperText={errors.glassSurface?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Tình trạng</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='status' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('status')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.status}
                        helperText={errors.status?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Giới tính</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='gender' control={control}
                    render={({
                      field: { onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <FormControl fullWidth className={classes.select}>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        error={!!errors.gender}
                        defaultValue='none'
                        onBlur={onBlur}
                        onChange={handeChangeGender}
                      >
                          <MenuItem value={'male'}>Nam</MenuItem>
                          <MenuItem value={'female'}>Nữ</MenuItem>
                          <MenuItem value={'none'}>Không</MenuItem>
                      </Select>
                      {errors.gender && <FormHelperText>{errors.gender?.message}</FormHelperText>}
                    </FormControl>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
      <Container className={classes.container}>
        <>
          <div className={classes.title}>Thông tin vận chuyển</div>
          <div className={classes.group + ' group'}>
            <div className={classes.groupLeft}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Cân nặng (sau khi đóng gói)</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='weight' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('weight')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.weight}
                        helperText={errors.weight?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Chiều cao</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='height' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('height')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.height}
                        helperText={errors.height?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
            <div className={classes.groupRight}>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Rộng</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='width' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('width')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.width}
                        helperText={errors.width?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
              <div className={classes.itemGroup}>
                <div className={classes['itemGroup-title']}>Dài</div>
                <div className={classes['itemGroup-content']}>
                  <Controller name='length' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <TextField
                        variant='outlined'
                        {...register('length')}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={!!errors.length}
                        helperText={errors.length?.message}
                        className={classes.input}
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      </Container>
      <div className={classes.groupBtn}>
        <Button variant="outlined" className={classes.btn} onClick={() => navigate('/shop/manager/watch')}>Hủy</Button>
        <Button type='submit' variant="contained" className={classes.btn + ' ' + classes.save}>Thêm sản phẩm</Button>
      </div>
      <ToastContainer autoClose={1000} position='bottom-right' />
    </form>
  );
}

export default NewWatch;
