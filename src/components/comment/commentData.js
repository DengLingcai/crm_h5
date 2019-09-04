export function CommentData (person, commentInfo) {
  this.person = person // 评论人信息
  this.commentInfo = commentInfo // 评论信息
}

export function CommentPersonInfo (name, headSrc) {
  this.name = name // 评论人姓名
  this.headSrc = headSrc // 评论人头像地址
}

export function CommentContentInfo (time, diggCount, content, isActive, id) {
  this.time = time // 评论时间
  this.count = diggCount // 点赞个数
  this.content = content // 评论内容
  this.isActive = isActive // 登陆人是否点赞
}
