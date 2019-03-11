class UploadMailer < ApplicationMailer

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.upload_mailer.upload_link.subject
  #
  def upload_link(email, url)
    @email = email
    @url = url
    mail to: @email, subject: "Upload link"
  end
end
