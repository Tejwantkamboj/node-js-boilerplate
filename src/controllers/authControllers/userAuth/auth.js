import { User, Token } from './../../../modals/index.js';
import catchAsync from '../../../utils/catchAsyunc.js';

const createUser = catchAsync(async(req,res)=>{
 const { email } = req.body;
  const isTaken = await User.isEmailTaken(email);
})
