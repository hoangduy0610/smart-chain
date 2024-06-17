export enum MessageCode {
	USER_NOT_FOUND = 'Không tìm thấy thông tin người dùng',
	USER_NOT_REGISTER = 'Bạn chưa đăng ký dịch vụ, vui lòng liên hệ quản trị hệ thống để đăng ký',
	USER_IS_DELETED = 'Tài khoản đã bị khóa',
	USER_ALREADY_EXISTED = 'Tên người dùng đã tồn tại trong hệ thống',
	USER_CREATE_ERROR = 'Không thể đăng ký ngay lúc này',
	USER_PASSWORD_WRONG = 'Tên người dùng hoặc mật khẩu không chính xác',
	USER_NOT_HAVE_PERMISSION = 'Bạn không có quyền truy cập chức năng này',
	USER_INVALID_TOKEN = 'Token không hợp lệ hoặc đã hết hạn',
	USER_OTP_ERROR = 'Mã OTP không chính xác',
	USER_OTP_EXPIRED = 'Mã OTP đã hết hạn',

	PRODUCT_NOT_FOUND = 'Không tìm thấy thông tin sản phẩm',

	HISTORY_NOT_FOUND = 'Không tìm thấy thông tin lịch sử',

	BATCH_NOT_FOUND = 'Không tìm thấy thông tin lô hàng',
	BATCH_FORWARD_INVALID = 'Không thể chuyển tiếp lô hàng này',
	BATCH_SOLD_OUT = 'Lô hàng đã bán hết',
	BATCH_NOT_BELONG_TO_YOU = 'Lô hàng này không thuộc quyền truy cập của bạn',

	BILL_NOT_FOUND = 'Không tìm thấy thông tin đơn vận',
	BILL_FOR_THIS_BATCH_FOUND = 'Lô hàng này đã được tạo đơn vận',
	BILL_NOT_BELONG_TO_YOU = 'Đơn vận này không thuộc quyền truy cập của bạn',
	BILL_FINISHED = 'Đơn vận đã hoàn thành',

	SELLER_STORAGE_ALREADY_EXIST = 'Lô hàng này đã tồn tại trong kho của bạn',
	SELLER_STORAGE_NOT_FOUND = 'Không tìm thấy thông tin lô hàng trong kho',

	UNKNOWN_ERROR = 'Lỗi không xác định',
}
