class BandsController < ApplicationController
  before_action :require_logged_in, except: [:index]

  def new
    @band = Band.new
  end

  def index
    @bands = Band.all
  end

  def create
    @band = Band.new(band_params)

    if @band.save
      redirect_to band_url(@band)
    else
      flash.now[:errors] = @band.errors.full_messages
      render :new
    end
  end

  def show
    @band = Band.find_by(id: params[:id])
  end

  def edit
    @band = Band.find_by(id: params[:id])
  end

  def destroy
    @band = Band.find_by(id: params[:id])
    @band.destroy
    redirect_to bands_url
  end

  private

  def band_params
    params.require(:band).permit(:name)
  end
end
