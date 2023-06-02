import React, { useEffect, useMemo, useRef, useState } from 'react';
import Container from '../../../components/Container';
import classes from './edit-watch.module.scss';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import { editProduct } from '../../../api/service/product-service';
import ClearIcon from '@mui/icons-material/Clear';
import RichText from '../../../components/RichText';
import { IWatch } from '../../../interface/watch/watchType';
import { useAppSelector } from '../../../hooks/hooks';
interface IDataNewWatch {
  CID: any[]
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
  BID: number
  madeBy: string
  warranty: string
  status: string
  weight: number
  height: number
  width: number
  length: number
  include: string
  used: string
  resalePrice: number
  isOld: boolean
}
interface IProps {
  product: IWatch
}
const schema = yup.object().shape({
  name: yup.string().required('Vui lòng nhập tên sản phẩm'),
  price: yup.number().typeError('Vui lòng nhập đơn giá').required('Vui lòng nhập đơn giá'),
  quantity: yup.number().typeError('Vui lòng nhập số lượng sản phẩm').required('Vui lòng nhập số lượng sản phẩm'),
  content: yup.string().required('Vui lòng nhập mô tả ngắn'),
  description: yup.string().required('Vui lòng nhập mô tả chi tiết')
});
function Edit({ product }: IProps) {
  const { register, setValue, control, watch, handleSubmit, clearErrors, formState: { errors } } = useForm<IDataNewWatch>({
    resolver: yupResolver(schema)
  });
  const { watchId } = useParams();
  const { categoryAndBrand } = useAppSelector(state => state.common);
  const [lstImg, setLstImg] = useState<any[]>([null, null, null, null, null, null]);
  const [lstFile, setLstFile] = useState<any[]>([null, null, null, null, null, null]);
  const [dataCategories, setDataCategories] = useState<any[]>([]);
  const [isOld, setIsOld] = useState(Number(product.isOld));
  const refList = {
    ref1: useRef<HTMLInputElement>(null),
    ref2: useRef<HTMLInputElement>(null),
    ref3: useRef<HTMLInputElement>(null),
    ref4: useRef<HTMLInputElement>(null),
    ref5: useRef<HTMLInputElement>(null),
    ref6: useRef<HTMLInputElement>(null)
  };
  const navigate = useNavigate();
  useEffect(() => {
    product?.id && setInitValueProduct();
  }, [product]);
  const setInitValueProduct = () => {
    if (product) {
      product?.createdAt && setValue('createdAt', product?.createdAt);
      product?.updatedAt && setValue('updatedAt', product?.updatedAt);
      product?.name && setValue('name', product?.name);
      product?.description && setValue('description', product?.description);
      product?.content && setValue('content', product?.content);
      product?.quantity && setValue('quantity', product?.quantity);
      product?.saled && setValue('saled', product?.saled);
      product?.price && setValue('price', product?.price);
      product?.gender && setValue('gender', product?.gender);
      product?.materialCord && setValue('materialCord', product?.materialCord);
      product?.glassSurface && setValue('glassSurface', product?.glassSurface);
      product?.glassSize && setValue('glassSize', product?.glassSize);
      product?.madeBy && setValue('madeBy', product?.madeBy);
      product?.warranty && setValue('warranty', product?.warranty);
      product?.status && setValue('status', product?.status);
      product?.weight && setValue('weight', +product?.weight);
      product?.height && setValue('height', +product?.height);
      product?.width && setValue('width', +product?.width);
      product?.length && setValue('length', +product?.length);
      product?.include && setValue('include', product?.include);
      product?.used && setValue('used', product?.used);
      product?.isOld && setIsOld(product.isOld ? 1 : 0);
      product?.CID && setDataCategories(product.CID);
      product?.BID && setValue('BID', product.BID);
      const newImg = [...lstImg];
      const newFile = [...lstFile];
      product.image && product.image.forEach((value, index) => {
        newImg[index] = value;
        newFile[index] = true;
      });
      setLstImg(newImg);
      setLstFile(newFile);
    }
  };
  const handleImageUpload = (e: any, index: number) => {
    const selectedFile = e.target.files[0]; // Lấy file đầu tiên được chọn
    const imageUrl = URL.createObjectURL(selectedFile); // Tạo đường dẫn URL cho file ảnh
    const files = [...lstFile];
    const imgs = [...lstImg];
    files[index] = selectedFile;
    imgs[index] = imageUrl;
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
  const handeChangeBrand = (event: SelectChangeEvent) => {
    const selectedBrand = event.target.value;
    setValue('BID', +selectedBrand);
  };
  const handeChangeCategory = (event: SelectChangeEvent) => {
    const selectCategory = event.target.value;
    const check = dataCategories.includes(selectCategory);
    !check && selectCategory && setDataCategories(prev => [...prev, selectCategory]);
  };
  const onSubmit: SubmitHandler<IDataNewWatch> = async (_data: IDataNewWatch) => {
    const newLstFile = lstFile.filter(file => !!file);
    const params = new FormData();
    Object.entries(_data).forEach(([key, value]) => {
      params.append(key, value);
    });
    newLstFile.forEach((file) => {
      file !== true && params.append('image', file);
    });
    dataCategories.forEach(data => params.append('CID', data));
    if (watchId) {
      const res = await editProduct(+watchId, params);
      if (res.success) {
        toast.success('Sửa sản phẩm thành công');
        navigate('/shop/manager/watch');
        window.scrollTo(0, 0);
      } else {
        toast.error('Sửa sản phẩm không thành công');
      }
    }
  };
  const getValue = (value: number) => {
    const item = categoryAndBrand.categories.find(item => item.id === value);
    return item?.name;
  };
  const removeCategory = (_value: string) => {
    const newData = dataCategories.filter(value => value !== _value);
    setDataCategories(newData);
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
              <div className={classes.item + ' ' + classes.description}>
                <div className={classes['item-title']}>*Nội dung</div>
                <div className={classes['item-content']}>
                  <Controller name='content' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <RichText value={value} onChange={onChange} noImage={true} />
                    )}
                  />
                  {!!errors.description && <FormHelperText>{errors.description?.message}</FormHelperText>}
                </div>
              </div>
              <div className={classes.item + ' ' + classes.description}>
                <div className={classes['item-title']}>*Mô tả sản phẩm</div>
                <div className={classes['item-content']}>
                  <Controller name='description' control={control}
                    render={({
                      field: { onChange, onBlur, value, name, ref },
                      fieldState: { invalid, isTouched, isDirty, error },
                      formState
                    }) => (
                      <RichText value={value} onChange={onChange} />
                    )}
                    />
                    {!!errors.description && <FormHelperText>{errors.description?.message}</FormHelperText>}
                </div>
              </div>
            </>
          </Container>
          <Container className={classes.container}>
            <>
              <div className={classes.title}>Thông tin chi tiết</div>
              <div className={classes['categories-box']}>
                <div className={classes['box-left']}>
                <div className={classes.itemGroup}>
                  <div className={classes['itemGroup-title']}>Danh mục:</div>
                  <div className={classes['itemGroup-content']}>
                        <FormControl fullWidth className={classes.select}>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          onChange={handeChangeCategory}
                        >
                          {
                            categoryAndBrand.categories.length > 0 && categoryAndBrand.categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                          }
                            <MenuItem value={''}>Không</MenuItem>
                        </Select>
                      </FormControl>
                  </div>
                </div>
                </div>
                <div className={classes['box-right']}>
                  {
                    dataCategories.map(value => <div key={value} className={classes['right-item']}>
                      <div className={classes.value}>{getValue(+value)}</div>
                      <ClearIcon className={classes.icon} onClick={() => removeCategory(value)}/>
                    </div>)
                  }
                </div>
              </div>
              <div className={classes.group + ' group'}>
                <div className={classes.groupLeft}>
                  <div className={classes.itemGroup}>
                    <div className={classes['itemGroup-title']}>Thương hiệu</div>
                    <div className={classes['itemGroup-content']}>
                      <Controller name='BID' control={control}
                        render={({
                          field: { onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState
                        }) => (
                          <FormControl fullWidth className={classes.select}>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            error={!!errors.BID}
                            defaultValue={product.BID ? product.BID : ''}
                            onBlur={onBlur}
                            onChange={handeChangeBrand}
                          >
                            {
                              categoryAndBrand.brands.length > 0 && categoryAndBrand.brands.map((item) => <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>)
                            }
                              <MenuItem value={''}>Không</MenuItem>
                          </Select>
                          {errors.BID && <FormHelperText>{errors.BID?.message}</FormHelperText>}
                        </FormControl>
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
                  <div className={classes.itemGroup}>
                    <div className={classes['itemGroup-title']}>Phụ kiện đi kèm</div>
                    <div className={classes['itemGroup-content']}>
                      <Controller name='include' control={control}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState
                        }) => (
                          <TextField
                            variant='outlined'
                            {...register('include')}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={!!errors.include}
                            helperText={errors.include?.message}
                            className={classes.input}
                          />
                        )}
                      />
                    </div>
                  </div>
                  {}
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
                            defaultValue={product.gender}
                            error={!!errors.gender}
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
                  <div className={classes.itemGroup}>
                    <div className={classes['itemGroup-title']}>Là đồng hồ cũ</div>
                    <div className={classes['itemGroup-content']}>
                      <FormControl fullWidth className={classes.select}>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={isOld.toString()}
                              defaultValue={''}
                              onChange={(e) => {
                                setIsOld(+e.target.value);
                              }}
                            >
                                <MenuItem value={0}>Không</MenuItem>
                                <MenuItem value={1}>Phải</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                  </div>
                  {
                    !!isOld && <div className={classes.itemGroup}>
                    <div className={classes['itemGroup-title']}>Thời gian đã sử dụng</div>
                    <div className={classes['itemGroup-content']}>
                      <Controller name='used' control={control}
                        render={({
                          field: { onChange, onBlur, value, name, ref },
                          fieldState: { invalid, isTouched, isDirty, error },
                          formState
                        }) => (
                          <TextField
                            variant='outlined'
                            {...register('used')}
                            onBlur={onBlur}
                            onChange={onChange}
                            error={!!errors.used}
                            helperText={errors.used?.message}
                            className={classes.input}
                          />
                        )}
                      />
                    </div>
                  </div>
                  }
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
                    <div className={classes['itemGroup-title']}>Cân nặng (sau khi đóng gói) (kg)</div>
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
                            type='number'
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
                    <div className={classes['itemGroup-title']}>Chiều cao (cm)</div>
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
                            type='number'
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
                    <div className={classes['itemGroup-title']}>Rộng (cm)</div>
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
                            type='number'
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
                    <div className={classes['itemGroup-title']}>Dài (cm)</div>
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
                            type='number'
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
            <Button type='submit' variant="contained" className={classes.btn + ' ' + classes.save}>Lưu</Button>
          </div>
          <ToastContainer autoClose={1000} position='bottom-right' />
        </form>
  );
}

export default Edit;
