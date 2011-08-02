# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.

module UtilsHelper

  @@cycle_pos = 0
  @@first5_pos = 0
  @@first5_tw = 0

  def assets_url
    @@cycle_pos = (@@cycle_pos.nil? || @@cycle_pos > 2) ? 0 : @@cycle_pos+1
    @site.config[:asset_url].gsub('%s', "st#{@@cycle_pos}")
  end
  
  def current_url
    #@site.config[:base_url]
    #return item[:filename][7..-1]
  end
  
  def base_url
    @site.config[:base_url]
  end  
  
  def test_form
    @site.config[:test_form]
  end   

end

include Nanoc3::Helpers::Rendering
include UtilsHelper
