class Upload < ApplicationRecord
  belongs_to :user, inverse_of: :uploads

  has_attached_file :file, :default_url => ''


  validates :description, presence: true
  validates :name, presence: true

  validates_attachment_presence :file
  validates_attachment_file_name :file, matches: [/png\Z/, /jpe?g\Z/, /gif\Z/]

end
