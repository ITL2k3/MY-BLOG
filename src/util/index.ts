export function removeVietnameseTones(str: string): string {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Xoá dấu
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}


export function slugify(text: string): string {
  return removeVietnameseTones(text)
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') // Xoá ký tự không hợp lệ
    .trim()
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .replace(/-+/g, '-'); // Thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
}